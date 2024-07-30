import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import { baseApiUrl } from '@/api-manage/ApiRoutes';
import { usePermissions } from '@/contexts/PermissionsContext';

import {Typography,IconButton,List,ListItem,TextField,ListItemText,Avatar,InputAdornment,FormControl, Select, MenuItem ,ListItemIcon,Grid} from "@mui/material";
const ContactList = () => {
    const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = React.useState({ username: "CrewOrder", text: 'Hello!', avatar: 'C', status: 'Online' });
    const [selectedOption, setSelectedOption] = useState("Chats");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = React.useState([]);
    const { fetchPermissions, permissionsData } = usePermissions();
    useEffect(() => {
        fetch(`${baseApiUrl}users`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleUserClick = (user) => {
        setUserInfo({
            username: user.username,
            text: 'Hello!',
            avatar: user.username[0].toUpperCase(),
            status: 'offline'
        });
        axios.get(`${baseApiUrl}getChatDetail/`, {
            params: {
                from_user: permissionsData.user.id,
                // user_id: permissionsData.user.id,
                to_user: user.id
            }
        })
        .then(response => {
            if (Array.isArray(response.data.data)) {
                setMessages(response.data.data);
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

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
    
      const handleSendMessage = () => {
        if (message.trim() !== '') {
          setMessages([...messages, { type: 'outgoing', text: message, avatar: '' }]);
          setMessage('');
        }
      };
    
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSendMessage();
        }
      };
    
    return (
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
                        <TextField variant="outlined" size="small" placeholder="Search Chats" value={searchQuery} onChange={handleSearchChange} style={{ flexGrow: 1 }}/>
                    </Box>
                    <Typography variant="h7" style={{ marginBottom: "1em", color:"#04774d"}}>Frequent contact</Typography>
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
                            <ListItemText style={{ marginLeft: "1em", color:"#04774d"}} primary={user.username} />
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
                                {messages.map((msg, index) => (
                                    <Box key={index} display="flex" alignItems="center" justifyContent={msg.type === 'incoming' ? 'flex-start' : 'flex-end'} marginBottom="1em">
                                        {msg.type === 'incoming' && <Avatar sx={{ bgcolor: deepOrange[500], marginRight: '0.5em' }}>{msg.avatar}</Avatar>}
                                            <Box style={{ backgroundColor: msg.type === 'incoming' ? '#f1f0f0' : '#04774d', color: msg.type === 'incoming' ? '#000' : '#fff', padding: '0.5em 1em', borderRadius: '10px', maxWidth: '70%',}}>
                                              {msg.text}
                                            </Box>
                                        {msg.type === 'outgoing' && <Avatar sx={{ bgcolor: deepPurple[500], marginLeft: '0.5em' }}>{msg.avatar}</Avatar>}
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
                                }}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                    {userInfo && (
                        <Box style={{ width: "100%", backgroundColor: "#ffffff", height: "84vh",padding: "1em", border: "1px solid #ccc" }}>
                            <Box style={{ width: "100%", padding: "1em", display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', backgroundColor: "#ffffff" }}>
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
                        </Box>
                    )}
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </section>
    );
  };  
export default ContactList;
//   import { styled } from "@mui/system";
//   import SendIcon from "@mui/icons-material/Send";
// Define your styles using `styled`
// const useStyles = {
//     table: {
//       minWidth: 650,
//     },
//     chatSection: {
//       width: "100%",
//       height: "80vh",
//     },
//     headBG: {
//       backgroundColor: "#e0e0e0",
//     },
//     borderRight500: {
//       borderRight: "1px solid #e0e0e0",
//     },
//     messageArea: {
//       height: "70vh",
//       overflowY: "auto",
//     },
//   };
  
//   // Create styled components
//   const ChatSection = styled(Paper)(useStyles.chatSection);
//   const BorderRight500 = styled(Grid)(useStyles.borderRight500);
//   const MessageArea = styled(List)(useStyles.messageArea);
// const Chat = () => {
//     return (
//       <div>
//         <Grid container>
//           <Grid item xs={12}>
//           </Grid>
//         </Grid>
//         <Grid container component={ChatSection}>
//           <BorderRight500 item xs={3}>
//             <List>
//               <ListItem button key="RemySharp">
//                 <ListItemIcon>
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="https://material-ui.com/static/images/avatar/1.jpg"
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary="John Wick"></ListItemText>
//               </ListItem>
//             </List>
//             <Divider />
//             <Grid item xs={12} style={{ padding: "10px" }}>
//               <TextField
//                 id="outlined-basic-email"
//                 label="Search"
//                 variant="outlined"
//                 fullWidth
//               />
//             </Grid>
//             <Divider />
//             <List>
//               <ListItem button key="RemySharp">
//                 <ListItemIcon>
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="https://material-ui.com/static/images/avatar/1.jpg"
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
//                 <ListItemText secondary="online" align="right"></ListItemText>
//               </ListItem>
//               <ListItem button key="Alice">
//                 <ListItemIcon>
//                   <Avatar
//                     alt="Alice"
//                     src="https://material-ui.com/static/images/avatar/3.jpg"
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary="Alice">Alice</ListItemText>
//               </ListItem>
//               <ListItem button key="CindyBaker">
//                 <ListItemIcon>
//                   <Avatar
//                     alt="Cindy Baker"
//                     src="https://material-ui.com/static/images/avatar/2.jpg"
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
//               </ListItem>
//             </List>
//           </BorderRight500>
//           <Grid item xs={9}>
//             <MessageArea>
//               <ListItem key="1">
//                 <Grid container>
//                   <Grid item xs={12}>
//                     <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText align="right" secondary="09:30"></ListItemText>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <ListItem key="2">
//                 <Grid container>
//                   <Grid item xs={12}>
//                     <ListItemText align="left" primary="Hey, I am Good! What about you ?"></ListItemText>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText align="left" secondary="09:31"></ListItemText>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <ListItem key="3">
//                 <Grid container>
//                   <Grid item xs={12}>
//                     <ListItemText align="right" primary="Cool. I am good, let's catch up!"></ListItemText>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText align="right" secondary="10:30"></ListItemText>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//             </MessageArea>
//             <Divider />
//             <Grid container style={{ padding: "20px" }}>
//               <Grid item xs={11}>
//                 <TextField
//                   id="outlined-basic-email"
//                   label="Type Something"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid xs={1} align="right">
//                 <Fab color="primary" aria-label="add">
//                   <SendIcon />
//                 </Fab>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </div>
//    );
// };
  