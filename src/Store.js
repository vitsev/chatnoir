import React from 'react'
import io from 'socket.io-client'
import messageReducer from './actions/MessageReducer'
import {initMessagesAction} from './actions/MessageActions'
import {receiveNewMessageAction} from './actions/MessageActions'
import {indexArrayByKey} from './utils/Utils'
import {groupArrayByKey} from './utils/Utils'
import {addAvatarToUsers} from './utils/Utils'
import {getAllUsers} from './services/ChatService'
import {getAllTopics} from './services/ChatService'
import {getAllMessages} from './services/ChatService'

export const CTX = React.createContext();

// Current user ID
const curUserID = Math.round(Math.random()) + 1; // Random value [1, 2]

// Socket instance
let socket;

// Send message to Socket for broadcasting
function sendChatAction(value) {
    socket.emit('chat message', value);
}


export default function Store(props) {
    const [allUserMessages, dispatch] = React.useReducer(messageReducer, {});
 
    if(!socket) {
        socket = io(process.env.REACT_APP_SERVER_URL)
        socket.on('chat message', function(socketMessage){
            dispatch(receiveNewMessageAction(socketMessage));
        })
    }

    // Fetch current user
    const [allUsers, setAllUsers] = React.useState({});
    React.useEffect(() => {
        getAllUsers().then(allUsers => {
            setAllUsers(addAvatarToUsers(indexArrayByKey(allUsers, 'user_id')));
        });
    },[setAllUsers])

    // Fetch all topics for the current user
    const [allTopics, setAllTopics] = React.useState([]);
    React.useEffect(() => {
        getAllTopics(curUserID).then(topics => setAllTopics(topics));
    },[setAllTopics])

    // Fetch all messages for the current user
    React.useEffect(() => {
        getAllMessages(curUserID).then(messages => {
            const initMessages = groupArrayByKey(messages, 'message_chat_id');
            dispatch(initMessagesAction(initMessages))
        });
    },[dispatch])

    return (
        <CTX.Provider value={{curUserID, allUsers, allTopics, allUserMessages, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}
