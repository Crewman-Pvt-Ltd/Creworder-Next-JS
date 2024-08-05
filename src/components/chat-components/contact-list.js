import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import { baseApiUrl } from '@/api-manage/ApiRoutes';
import Badge from '@mui/material/Badge';
import SvgIcon from '@mui/material/SvgIcon';
import { usePermissions } from '@/contexts/PermissionsContext';

import { Typography, IconButton, List, ListItem, TextField, ListItemText, Avatar, InputAdornment, FormControl, Select, MenuItem, ListItemIcon, Grid } from "@mui/material";
import { Forest } from '@mui/icons-material';
const ContactList = () => {
    const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = React.useState({ username: "CrewOrder", text: 'Hello!', avatar: 'C', status: 'Online' });
    const [selectedOption, setSelectedOption] = useState("Chats");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = React.useState([]);
    const [socket, setSocket] = useState(null);
    const { fetchPermissions, permissionsData } = usePermissions();
    const [chatusrDetails, setChatusrDetails] = useState('');
    //=======================================================================
    //                   Get unread chat count
    //=======================================================================
    const get_chat_count = async (user_data) => {
        const updatedUsers = await Promise.all(user_data.map(async (element) => {
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${baseApiUrl}getChatCount?to_user=${permissionsData.user.id}&from_user=${element.id}`,
                    headers: {},
                };

                const response = await axios.request(config);
                element.chat_count = response.data.chat_count;
            } catch (error) {
                element.chat_count = null;
                console.log(error);
            }
            return element;
        }));

        setUsers(updatedUsers);
    }

    //=======================================================================
    //                   Get users for chat here
    //=======================================================================

    useEffect(() => {
        fetch(`${baseApiUrl}users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // setUsers(data);
                get_chat_count(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    //=======================================================================
    //                 Get Old chat here form database
    //=======================================================================
    const handleUserClick = (user) => {
        setChatusrDetails(user);
        setUserInfo({
            username: user.username || '',
            email: user.email || '',
            phone: user.profile?.contact_no || '',
            role: user.role?.role || '',
            text: 'Hello!',
            avatar: user.username ? user.username[0].toUpperCase() : '',
            status: 'offline'
        });
        axios.get(`${baseApiUrl}getChatDetail/`, {
            params: {
                from_user: permissionsData.user.id,
                to_user: user.id
            }
        })
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setMessages(response.data.data);
                    console.log("SHIVAM1");
                } else {
                    console.error('Unexpected response data format:', response.data);
                    setMessages([]);
                }
            })
            .catch(error => {
                console.error('Error fetching chat details:', error);
                setMessages([]);
            });
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    //=======================================================================
    //                    WebSocket Setup And Incomming massage manage here
    //=======================================================================
    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:3001');

            ws.onopen = () => {
                console.log('WebSocket connection established');
                setSocket(ws);
            };

            ws.onmessage = (event) => {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const incomingMessage = JSON.parse(reader.result);
                        setMessages(prevMessages => {
                            const messageExists = prevMessages.some(
                                msg => msg.id === incomingMessage.id
                            );

                            if (!messageExists) {
                                return [...prevMessages, incomingMessage];
                            }
                            return prevMessages;
                        });

                        console.log("Updated Messages:", incomingMessage.from_user);
                        console.log("SHIVAM2");
                    } catch (error) {
                        console.error('Error parsing JSON message:', error);
                    }
                };
                reader.readAsText(event.data);
            };

            ws.onclose = (event) => {
                console.log('WebSocket connection closed:', event.reason);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };
        connectWebSocket();
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    //=======================================================================
    //         Sendmassage Setup and Create Chat manage here
    //=======================================================================
    const handleSendMessage = () => {
        if (message.trim() !== '' && socket) {
            const messageObject = {
                from_user: permissionsData.user.id,
                to_user: chatusrDetails.id,
                type: 'text',
                text: message,
                avatar: ''
            };

            let data = JSON.stringify({
                "type": "text",
                "text": message,
                "massage_type": "text",
                "user_id": permissionsData.user.id,
                "from_user": permissionsData.user.id,
                "to_user": chatusrDetails.id,
                "chat_status": 1
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseApiUrl}createChat/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data.Success));
                    if (response.data.Success === true) {
                        messageObject['id'] = response.data.ChatData.id;
                        const messageString = JSON.stringify(messageObject);
                        socket.send(messageString);
                        setMessage('')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    //=======================================================================
    //        Hadle Type massage here
    //=======================================================================
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };
    const sortedMessages = messages.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return (
        <>
            <section maxWidth="md">
                <Grid container>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box style={{ width: "100%", backgroundColor: "#ffffff", padding: "1em", border: "1px solid #ccc" }} display="flex" justifyContent="space-between" alignItems="center">
                            <FormControl>
                                <Select value={selectedOption} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="Chats" selected>Chats</MenuItem>
                                    <MenuItem value="Contacts">Contacts</MenuItem>
                                    <MenuItem value="Group">Group</MenuItem>
                                    <MenuItem value="Archived">Archived</MenuItem>
                                    <MenuItem value="Favorites">Favorites</MenuItem>
                                </Select>
                            </FormControl>
                            <Avatar style={{ backgroundColor: "#405189" }}>
                                <IconButton color="primary">
                                    <AddIcon style={{ color: "#ffffff" }} />
                                </IconButton>
                            </Avatar>
                        </Box>
                        <Box style={{ width: "100%", height: "84vh", overflowY: "scroll", backgroundColor: "#ffffff", padding: "1em" }}>
                            {/* Search Box */}
                            <Box display="flex" alignItems="center" marginBottom="1em">
                                <TextField variant="outlined" size="small" placeholder="Search Chats" value={searchQuery} onChange={handleSearchChange} style={{ flexGrow: 1 }} />
                            </Box>
                            <Typography variant="h7" style={{ marginBottom: "1em", color: "#04774d" }}>Frequent contact</Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Avatar sx={{ width: 56, height: 56 }}>H</Avatar>
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>S</Avatar>
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepPurple[500] }}>H</Avatar>
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>I</Avatar>
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepPurple[500] }}>V</Avatar>
                            </Stack>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {users.map((user, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={() => handleUserClick(user)}>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>{user.username[0].toUpperCase()}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText style={{ marginLeft: "1em", color: "#04774d" }} primary={user.username} />
                                            <Badge badgeContent={user.chat_count} color="primary">
                                            </Badge>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={9}>
                        {userInfo && (
                            <Box style={{ width: "100%", backgroundColor: "#ffffff", padding: "1em", border: "1px solid #ccc" }} display="flex" alignItems="center">
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>{userInfo.avatar}</Avatar>
                                <Box marginLeft="1em">
                                    <Typography variant="h6" style={{ marginBottom: "0.2em" }}>{userInfo.username}</Typography>
                                    <Typography variant="body2" color="textSecondary">{userInfo.status}</Typography>
                                </Box>
                            </Box>
                        )}
                        <Grid container>
                            <Grid item xs={12} lg={8}>
                                <Box style={{ display: 'flex', flexDirection: 'column', width: "100%", height: "84vh", backgroundColor: "#ffffff" }}>
                                    <Box style={{ flexGrow: 1, overflowY: "scroll", padding: "1em" }}>
                                        {sortedMessages.map((msg, index) => (
                                            <Box key={index} display="flex" alignItems="center" justifyContent={msg.to_user === permissionsData.user.id ? 'flex-start' : 'flex-end'} marginBottom="1em">
                                                {msg.to_user === permissionsData.user.id && <Avatar sx={{ bgcolor: deepOrange[500], marginRight: '0.5em' }}>{msg.avatar}</Avatar>}
                                                <Box style={{ backgroundColor: msg.to_user === permissionsData.user.id ? '#f1f0f0' : '#04774d', color: msg.to_user === permissionsData.user.id ? '#000' : '#fff', padding: '0.5em 1em', borderRadius: '10px', maxWidth: '70%', }}>
                                                    {msg.text}
                                                </Box>
                                                {msg.from_user === permissionsData.user.id && <Avatar sx={{ bgcolor: deepPurple[500], marginLeft: '0.5em' }}>{msg.avatar}</Avatar>}
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box style={{ padding: "1em", borderTop: "1px solid #ccc" }}>
                                        <TextField variant="outlined" size="small" fullWidth placeholder="Type a message..." value={message} onChange={handleMessageChange} onKeyDown={handleKeyDown} InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton color="primary" onClick={handleSendMessage}>
                                                        <SendIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                {userInfo && (
                                    <Box style={{ width: "100%", backgroundColor: "#ffffff", height: "84vh", padding: "1em", border: "1px solid #ccc" }}>
                                        <Box style={{ width: "100%", padding: "1em", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffffff" }}>
                                            {/* Avatar */}
                                            <Avatar sx={{ width: 100, height: 100, bgcolor: 'deepOrange[500]' }}>
                                                {userInfo.avatar}
                                            </Avatar>
                                            {/* Name */}
                                            <Typography variant="h6" style={{ marginTop: '1em', color: '#000000' }}>
                                                {userInfo.username}
                                            </Typography>

                                            {/* Caption */}
                                            <Typography variant="body2" style={{ marginTop: '0.5em', color: '#666666' }}>
                                                No phone calls Always busy 😎.
                                            </Typography>
                                            <hr style={{ width: '80%', margin: '1em 0', border: '1px solid #ccc' }} />
                                        </Box>
                                        <Box style={{ width: '100%', padding: '1em', backgroundColor: '#ffffff' }}>
                                            {/* Row 1 */}
                                            <Box style={{ width: '100%', padding: '1em 0', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <span className="feather-icon" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ marginRight: '0.5em' }}>
                                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                                    </svg>
                                                    {userInfo.role}
                                                </span>
                                            </Box>

                                            <Box style={{ width: '100%', padding: '1em 0', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <span className="feather-icon" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ marginRight: '0.5em' }}>
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                    </svg>
                                                    {userInfo.email}
                                                </span>
                                            </Box>

                                            <Box style={{ width: '100%', padding: '1em 0', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <span className="feather-icon" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ marginRight: '0.5em' }}>
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                    </svg>
                                                    {userInfo.phone}
                                                </span>
                                            </Box>

                                            <Box style={{ width: '100%', padding: '1em 0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <span className="feather-icon" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ marginRight: '0.5em' }}>
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                    Noida
                                                </span>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </section>
        </>
    );
};
export default ContactList;