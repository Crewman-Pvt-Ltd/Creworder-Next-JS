import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from "@/utils/getToken";
import SendIcon from '@mui/icons-material/Send';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import { baseApiUrl } from '@/api-manage/ApiRoutes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePermissions } from '@/contexts/PermissionsContext';
import {
    Box, Typography, IconButton, List, ListItem, TextField, ListItemText, Avatar,
    InputAdornment, FormControl, Select, MenuItem, ListItemIcon, Grid, Menu, Badge, Stack, Dialog,
    DialogTitle, DialogContent, DialogActions, Checkbox, Button
} from "@mui/material";
const ContactList = () => {
    const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [loadings, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = React.useState({ username: "CrewOrder", text: 'Hello!', avatar: 'C', status: 'Online' });
    const [selectedOption, setSelectedOption] = useState("Chats");
    const [message, setMessage] = useState('');
    const [chatGroups, setchatGroups] = useState([]);
    const [messages, setMessages] = React.useState([]);
    const [socket, setSocket] = useState(null);
    const { fetchPermissions, permissionsData, loading } = usePermissions();
    const [anchorEl, setAnchorEl] = useState(null);
    const [chatusrDetails, setChatusrDetails] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
    const [openGroupDialog, setOpenGroupDialog] = useState(false); // State for dialog open/close
    const token = getToken();
    //=======================================================================
    //                   Get Unread Chat Count
    //=======================================================================

    /**
     * Fetches the unread chat count for a list of users and updates the 
     * `users` state with the retrieved counts. This function iterates over 
     * each user in the `user_data` and makes an API call to get the unread 
     * chat count between the current user and the target user.
     * 
     * - `user_data` (Object): The data object containing a list of users 
     *   in the `results` property.
     * 
     * The function performs the following steps:
     * 1. Uses `Promise.all` to handle concurrent API requests for each user 
     *    in the `user_data.results` array.
     * 2. For each user, constructs a GET request to the `getChatCount` API endpoint,
     *    with the current user ID and the target user's ID as query parameters.
     * 3. If the API request is successful, updates the `chat_count` property 
     *    of the user object with the count received from the API.
     * 4. If an error occurs during the API request, sets the `chat_count` to `null`
     *    and logs the error to the console.
     * 5. Updates the state with the list of users, now including the unread chat counts.
     * 
     * @param {Object} user_data - The data object containing a list of users.
     */
    const get_chat_count = async (user_data) => {
        const updatedUsers = await Promise.all(user_data.results.map(async (element) => {
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
    };

    //=======================================================================
    //                   Get Users for Chat
    //=======================================================================

    /**
     * Fetches the list of users for chat when the component mounts. 
     * This effect performs an asynchronous fetch request to retrieve 
     * users that the current user can chat with. It also handles 
     * updating the state based on the fetch result.
     * 
     * The effect performs the following steps:
     * 1. Executes a fetch request to the `getUserListChat` API endpoint with
     *    the current user's ID as a query parameter.
     * 2. Checks the response from the fetch request. If the response is not
     *    OK (e.g., network error or non-200 status code), it throws an error.
     * 3. If the response is successful, parses the JSON data from the response.
     * 4. Calls the `get_chat_count` function with the fetched data to update
     *    each user's unread chat count.
     * 5. Sets the `loading` state to `false` once the data has been processed.
     * 6. If an error occurs during the fetch operation, sets the `error` state 
     *    and also sets the `loading` state to `false`.
     * 
     * Dependencies:
     * - The empty dependency array `[]` ensures this effect only runs once,
     *   when the component mounts.
     */
    useEffect(() => {
        fetch(`${baseApiUrl}getUserListChat/?user_id=${permissionsData?.user?.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                get_chat_count(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    //=======================================================================
    //                 Get Old Chat Here from Database
    //=======================================================================

    /**
     * Handles the click event on a user, retrieves the chat history
     * between the current user and the selected user, and updates
     * the state with the retrieved chat details.
     * 
     * This function performs the following actions:
     * 1. Sets the details of the selected user in the `chatusrDetails` state.
     * 2. Updates the `userInfo` state with the selected user's information,
     *    including username, email, phone number, role, a default message, 
     *    avatar (initial of the username), and status.
     * 3. Makes an HTTP GET request to the `getChatDetail` API endpoint to
     *    fetch the chat history between the current user (`from_user`) and
     *    the selected user (`to_user`).
     * 4. If the response data is an array, it sets the `messages` state with
     *    the chat data.
     * 5. Logs a message to the console for debugging purposes if the data
     *    format is correct.
     * 6. If the response data format is unexpected, logs an error and clears
     *    the messages.
     * 7. Catches and logs any errors that occur during the API request and
     *    clears the messages state in case of an error.
     * 
     * @param {Object} user - The user object representing the selected user.
     */
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


    //=======================================================================
    //                 Get Old Group Chat Here from Database
    //=======================================================================

    /**
     * Handles the retrieval of chat history for a selected group from the database.
     * Updates the chat interface with the group's chat details and information.
     * 
     * This function performs the following actions:
     * 1. Adds an `id` property to the `group_details` object, derived from the `group_id` property.
     * 2. Sets the group details in the `chatusrDetails` state.
     * 3. Updates the `userInfo` state with the group's information, including:
     *    - `username`: The name of the group.
     *    - `email`: The group's email (if available).
     *    - `phone`: The group's contact number (if available).
     *    - `role`: The group's role (if available).
     *    - `text`: A default message ('Hello!').
     *    - `avatar`: The first letter of the group's name capitalized.
     *    - `status`: Default status set to 'offline'.
     * 4. Makes an HTTP GET request to the `getChatDetail` API endpoint to fetch the chat history
     *    for the selected group using the `group_id`.
     * 5. If the response data is an array, it updates the `messages` state with the retrieved chat data.
     * 6. Logs a message to the console for debugging purposes if the data format is correct.
     * 7. If the response data format is unexpected, logs an error and clears the messages.
     * 8. Catches and logs any errors that occur during the API request and clears the messages state
     *    in case of an error.
     * 
     * @param {Object} group_details - The object containing details of the selected group.
     */
    const getGroupChats = (group_details) => {
        group_details['id'] = group_details.group_id
        console.log(group_details);
        setChatusrDetails(group_details);
        setUserInfo({
            username: group_details.group_name || '',
            email: group_details.email || '',
            phone: group_details.profile?.contact_no || '',
            role: group_details.role?.role || '',
            text: 'Hello!',
            avatar: group_details.group_name ? group_details.group_name[0].toUpperCase() : '',
            status: 'offline'
        });
        axios.get(`${baseApiUrl}getChatDetail/`, {
            params: {
                from_user: permissionsData.user.id,
                group_id: group_details.group_id
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

    //=======================================================================
    //                 Handle Option Change for Chat View
    //=======================================================================

    /**
     * Handles changes in the selected option for viewing chat groups, contacts, or chats.
     * 
     * This function is triggered when the user selects an option from a dropdown or similar
     * control. It performs the following actions based on the selected option:
     * 
     * 1. **Group**:
     *    - If the selected option is 'Group', it checks if `permissionsData` is not null.
     *    - Fetches the list of chat groups for the user from the API using `fetch` with the endpoint
     *      `getChatgroups`.
     *    - Checks the response status and throws an error if it's not OK.
     *    - Parses the response as JSON and updates the `chatGroups` state with the retrieved groups.
     *    - Catches and handles any errors that occur during the fetch operation, and sets the error
     *      state.
     * 
     * 2. **Contacts**:
     *    - If the selected option is 'Contacts', it checks if `permissionsData` is not null.
     *    - Fetches the list of contacts from the API using `fetch` with the endpoint `users`.
     *    - Checks the response status and throws an error if it's not OK.
     *    - Parses the response as JSON and updates the list of users by calling the `get_chat_count` function.
     *    - Catches and handles any errors that occur during the fetch operation, and sets the error
     *      state.
     * 
     * 3. **Chats**:
     *    - If the selected option is 'Chats', it checks if `permissionsData` is not null.
     *    - Fetches the list of chat users from the API using `fetch` with the endpoint
     *      `getUserListChat`, passing the user ID as a parameter.
     *    - Checks the response status and throws an error if it's not OK.
     *    - Parses the response as JSON and updates the list of chats by calling the `get_chat_count` function.
     *    - Catches and handles any errors that occur during the fetch operation, and sets the error
     *      state.
     * 
     * @param {Object} event - The event object from the change event, containing the selected value.
     */
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);

        if (event.target.value === 'Group') {
            permissionsData != null &&
                fetch(`${baseApiUrl}getChatgroups/?user_id=${permissionsData?.user?.id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        setchatGroups(data.Groups);
                    })
                    .catch(error => {
                        setError(error);
                        setLoading(false);
                    });
        }

        if (event.target.value === 'Contacts') {
            permissionsData != null &&
                fetch(`${baseApiUrl}users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    get_chat_count(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }

        if (event.target.value === 'Chats') {
            permissionsData != null &&
                fetch(`${baseApiUrl}getUserListChat/?user_id=${permissionsData?.user?.id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        get_chat_count(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setError(error);
                        setLoading(false);
                    });
        }
    };


    //=======================================================================
    //                 Handle Search Query Change
    //=======================================================================

    /**
     * Updates the search query based on user input.
     * 
     * This function is triggered when the user types in a search input field. It updates
     * the state with the current value of the search input field, allowing for dynamic
     * filtering or searching of data based on the user’s input.
     * 
     * @param {Object} event - The event object from the change event, containing the current value of the input.
     */
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    //=======================================================================
    //                 WebSocket Setup and Incoming Message Management
    //=======================================================================

    /**
     * Establishes a WebSocket connection and handles incoming messages.
     * 
     * This effect sets up a WebSocket connection to the specified URL and manages
     * the connection's lifecycle. It includes event handlers for:
     * 
     * - `onopen`: Logs a message when the WebSocket connection is successfully
     *   established and stores the WebSocket instance in the state.
     * 
     * - `onmessage`: Handles incoming messages by reading the message data, 
     *   parsing it from JSON, and updating the messages state if the message
     *   is not already present.
     * 
     * - `onclose`: Logs a message when the WebSocket connection is closed, 
     *   including the reason for closure.
     * 
     * - `onerror`: Logs errors encountered during WebSocket communication.
     * 
     * The WebSocket connection is cleaned up by closing it when the component
     * unmounts or the effect is re-run.
     */
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


    //=======================================================================
    //                  Handle Message Input Change
    //=======================================================================

    /**
     * Updates the message state with the current value of the input field.
     * 
     * This function is called when the user types into the message input field.
     * It retrieves the current value from the input event and updates the 
     * `message` state accordingly. This allows the component to keep track of
     * the user's message input in real-time.
     * 
     * @param {Object} event - The change event object from the input field.
     */
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    //=======================================================================
    //             Send Message and Create Chat Entry
    //=======================================================================

    /**
     * Handles the sending of a chat message and creates a chat entry in the database.
     * 
     * This function is triggered when the user sends a message. It first checks if 
     * the message input is not empty and if a WebSocket connection exists. It then 
     * constructs a message object with relevant details, including the sender's ID, 
     * recipient's ID, and message content.
     * 
     * The function determines the chat type based on whether the recipient is a group 
     * or a single user. It then sends a POST request to create a new chat entry in the 
     * database. If the request is successful, the message object is sent through the 
     * WebSocket connection to update the chat in real-time. The message input field is 
     * then cleared.
     * 
     * @returns {void}
     */
    const handleSendMessage = () => {
        let chat_type;
        if (message.trim() !== '' && socket) {
            const messageObject = {
                from_user: permissionsData.user.id,
                to_user: chatusrDetails.id,
                type: 'text',
                text: message,
                avatar: ''
            };
            if ('group_id' in chatusrDetails) {
                chat_type = "group_chat";
            } else {
                chat_type = "simple_chat";
            }
            let data = JSON.stringify({
                "type": "text",
                "text": message,
                "massage_type": "text",
                "user_id": permissionsData.user.id,
                "from_user": permissionsData.user.id,
                "to_user": chatusrDetails.id,
                "chat_status": 1,
                "chat_type": chat_type
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
                        messageObject['chat_session'] = response.data.ChatData.chat_session;
                        const messageString = JSON.stringify(messageObject);
                        socket.send(messageString);
                        setMessage('');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    //=======================================================================
    //            Handle Enter Key Press for Sending Message
    //=======================================================================

    /**
     * Handles the 'Enter' key press event to send a message.
     * 
     * This function is triggered when the user presses a key while typing in the
     * message input field. If the pressed key is 'Enter', it prevents the default
     * behavior (which might include adding a new line in a text area) and calls
     * the `handleSendMessage` function to send the message.
     * 
     * @param {KeyboardEvent} event - The keyboard event triggered by the user.
     * @returns {void}
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    //=======================================================================
    //       Sort Messages and Extract Chat Session ID
    //=======================================================================

    /**
     * Sorts chat messages based on their creation time and extracts the chat session ID.
     * 
     * The `sortedMessages` variable contains a sorted array of messages, ordered
     * chronologically by their `created_at` timestamp. The `chatSessionId` is extracted
     * from the first message in the sorted array, if it exists, or defaults to 0.
     * 
     * @type {Array} sortedMessages - Array of sorted messages by creation time.
     * @type {number} chatSessionId - ID of the chat session derived from the sorted messages.
     */
    const sortedMessages = messages.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const chatSessionId = sortedMessages.length > 0 ? sortedMessages[0].chat_session : 0;



    //=======================================================================
    //                  Handle Menu Open and Close
    //=======================================================================

    /**
     * Opens the menu by setting the anchor element for the menu.
     * 
     * This function sets the anchor element to the current target of the event,
     * which is typically the element that triggered the menu to open.
     * 
     * @param {Object} event - The event object from the menu trigger.
     * @returns {void}
     */
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Closes the menu by clearing the anchor element.
     * 
     * This function sets the anchor element to null, which causes the menu
     * to be hidden.
     * 
     * @returns {void}
     */
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //=======================================================================
    //                  Handle Dialog Open and Close
    //=======================================================================

    /**
     * Opens the chat creation dialog.
     * 
     * This function sets the state to open the chat creation dialog and
     * closes the menu if it is open.
     * 
     * @returns {void}
     */
    const handleCreateChat = () => {
        setOpenDialog(true); // Open dialog
        handleMenuClose();   // Close menu
    };

    /**
     * Closes the chat creation dialog.
     * 
     * This function sets the state to close the chat creation dialog.
     * 
     * @returns {void}
     */
    const handleDialogClose = () => {
        setOpenDialog(false); // Close dialog
    };

    /**
     * Closes the group creation dialog.
     * 
     * This function sets the state to close the group creation dialog.
     * 
     * @returns {void}
     */
    const handleGroupDialogClose = () => {
        setOpenGroupDialog(false); // Close dialog
    };

    /**
     * Opens the group creation dialog.
     * 
     * This function sets the state to open the group creation dialog and
     * closes the menu if it is open.
     * 
     * @returns {void}
     */
    const handleCreateGroup = () => {
        setOpenGroupDialog(true); // Open dialog
        handleMenuClose();        // Close menu
    };


    //=======================================================================
    //                Handle User Selection for Group Creation
    //=======================================================================

    /**
     * Toggles the selection of a user for group creation.
     * 
     * This function adds the user's ID to the `selectedUsers` array if it's not
     * already present, or removes it if it is. It updates the state with the
     * new list of selected user IDs.
     * 
     * @param {Object} user - The user object containing the user's ID.
     * @returns {void}
     */
    const handleSelectUser = (user) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(user.id)
                ? prevSelectedUsers.filter((id) => id !== user.id)
                : [...prevSelectedUsers, user.id]
        );
    };

    //=======================================================================
    //                Create Group and Send Data to Server
    //=======================================================================

    /**
     * Creates a new group with the selected users and sends the data to the server.
     * 
     * This function constructs the group data object, including the group name and
     * a list of selected users with their status. It then sends a POST request to
     * the server to create the group. On success, it closes the group dialog; on
     * failure, it logs an error message.
     * 
     * @returns {void}
     */
    const createGroup = () => {
        // Construct the group data object
        const groupData = {
            group_name: groupName,
            members: selectedUsers.map(userId => ({
                group_member_id: userId,
                group_member_status: 1
            }))
        };

        // Log the group data for debugging purposes
        console.log("Group Data:", JSON.stringify(groupData, null, 2));

        // Configuration for the POST request
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseApiUrl}createGroup/`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: groupData
        };

        // Send the request to create the group
        axios.request(config)
            .then((response) => {
                // Log the response data for debugging purposes
                console.log("Response Data:", JSON.stringify(response.data, null, 2));
                // Close the group creation dialog
                handleGroupDialogClose();
            })
            .catch((error) => {
                // Log any errors that occur
                console.error("Error creating group:", error);
            });
    };


    return (
        <>
            <section maxWidth="md">
                <Grid container>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box style={{ width: "100%", backgroundColor: "#ffffff", padding: "1em", border: "1px solid #ccc" }} display="flex" justifyContent="space-between" alignItems="center">
                            <FormControl>
                                <Select value={selectedOption} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="Chats">Chats</MenuItem>
                                    <MenuItem value="Contacts">Contacts</MenuItem>
                                    <MenuItem value="Group">Group</MenuItem>
                                    <MenuItem value="Archived">Archived</MenuItem>
                                    <MenuItem value="Favorites">Favorites</MenuItem>
                                </Select>
                            </FormControl>
                            <Avatar >
                                <IconButton onClick={handleMenuOpen}>
                                    <MoreVertIcon style={{ color: "#000" }} />
                                </IconButton>
                            </Avatar>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleCreateChat}>Create Chat</MenuItem>
                                <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                            </Menu>
                        </Box>

                        <Box style={{ width: "100%", height: "84vh", overflowY: "scroll", backgroundColor: "#ffffff", padding: "1em" }}>
                            {/* Search Box */}
                            <Box display="flex" alignItems="center" marginBottom="1em">
                                <TextField variant="outlined" size="small" placeholder="Search" value={searchQuery} onChange={handleSearchChange} style={{ flexGrow: 1 }} />
                            </Box>

                            {/* Conditional Rendering Based on Selected Option */}
                            {selectedOption === 'Chats' && (
                                <>
                                    <Typography variant="h7" style={{ marginBottom: "1em", color: "#04774d" }}>Frequent Contacts</Typography>
                                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                        {/* Display Avatars for Frequent Contacts */}
                                        <Avatar sx={{ width: 56, height: 56 }}>S</Avatar>
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>H</Avatar>
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>I</Avatar>
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>V</Avatar>
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>A</Avatar>
                                        {/* Add more avatars */}
                                    </Stack>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {users.map((user, index) => (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton onClick={() => handleUserClick(user)}>
                                                    <ListItemIcon>
                                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>{user.username[0].toUpperCase()}</Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText style={{ marginLeft: "1em", color: "#04774d" }} primary={user.username} />
                                                    <Badge badgeContent={user.chat_count} color="primary" />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}

                            {selectedOption === 'Contacts' && (
                                <>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {users.map((user, index) => (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton onClick={() => handleUserClick(user)}>
                                                    <ListItemIcon>
                                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>{user.username[0].toUpperCase()}</Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText style={{ marginLeft: "1em", color: "#04774d" }} primary={user.username} />
                                                    <Badge badgeContent={user.chat_count} color="primary" />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                            {selectedOption === 'Group' && (
                                <>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {chatGroups.map((group, index) => (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton onClick={() => getGroupChats(group)}>
                                                    <ListItemIcon>
                                                        <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>{group.group_name[0].toUpperCase()}</Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText style={{ marginLeft: "1em", color: "#04774d" }} primary={group.group_name} />
                                                    <Badge badgeContent={0} color="primary" />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                            {selectedOption === 'Archived' && (
                                <>
                                    <Typography variant="h6">Archived</Typography>
                                    {/* Add your archived content here */}
                                </>
                            )}

                            {selectedOption === 'Favorites' && (
                                <>
                                    <Typography variant="h6">Favorites</Typography>
                                    {/* Add your favorites content here */}
                                </>
                            )}
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
                                        {sortedMessages
                                            .filter((msg) => chatSessionId === msg.chat_session)
                                            .map((msg, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent={msg.to_user === permissionsData.user.id ? 'flex-start' : 'flex-end'}
                                                    marginBottom="1em"
                                                >
                                                    {msg.to_user === permissionsData.user.id && (
                                                        <Avatar sx={{ bgcolor: deepOrange[500], marginRight: '0.5em' }}>
                                                            {msg.avatar}
                                                        </Avatar>
                                                    )}
                                                    <Box
                                                        style={{
                                                            backgroundColor: msg.to_user === permissionsData.user.id ? '#f1f0f0' : '#04774d',
                                                            color: msg.to_user === permissionsData.user.id ? '#000' : '#fff',
                                                            padding: '0.5em 1em',
                                                            borderRadius: '10px',
                                                            maxWidth: '70%',
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </Box>
                                                    {msg.from_user === permissionsData.user.id && (
                                                        <Avatar sx={{ bgcolor: deepPurple[500], marginLeft: '0.5em' }}>
                                                            {msg.avatar}
                                                        </Avatar>
                                                    )}
                                                </Box>
                                            ))
                                        }
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
                                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                                    </svg>
                                                    {userInfo.role}
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
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                    </svg>
                                                    {userInfo.email}
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


                {/* Start Dialog for creating a new chat */}
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Select a User to Chat</DialogTitle>
                    <DialogContent>
                        <List>
                            {users.map((user) => (
                                <ListItem key={user.id} button onClick={() => { handleUserClick(user); handleDialogClose(); }}>
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.username ? user.username[0].toUpperCase() : ''}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} secondary={user.email} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* END Dialog for creating a new chat */}

                <Dialog open={openGroupDialog} onClose={handleGroupDialogClose}>
                    <DialogTitle>Select a User for Group</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Enter Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                            }}
                        />
                        <List>
                            {users.map((user) => (
                                <ListItem key={user.id}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelectUser(user)}
                                        />
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                            {user.username ? user.username[0].toUpperCase() : ''}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} secondary={user.email} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={createGroup} color="primary">
                            Create Group
                        </Button>
                        <Button onClick={handleGroupDialogClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </section>
        </>
    );
};
export default ContactList;