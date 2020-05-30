import React from 'react'
import io from 'socket.io-client'
import messageReducer from './actions/MessageReducer'
import {receiveMessageAction} from './actions/MessageActions'
import {indexArrayByKey} from './utils/Utils'
import {groupArrayByKey} from './utils/Utils'
import {getAllUsers} from './services/ChatService'
import {getAllTopics} from './services/ChatService'
import {getAllMessages} from './services/ChatService'

export const CTX = React.createContext();

// Current user ID
const curUserID = Math.round(Math.random()) + 1; // Random value [1, 2]

const initState = {
    topic1: [
        {from: 'Oleg', msg: 'Hi!'},
        {from: 'Sveta', msg: 'Hello'},
        {from: 'Sveta', msg: 'Hello'},
        {from: 'Sveta', msg: 'Hello'},
        {from: 'Sveta', msg: 'Hello'},
        {from: 'Oleg', msg: 'How are you?'}
    ],
    topic2: [
        {from: 'Sveta', msg: "What's up"},
        {from: 'Oleg', msg: 'Not much'},
        {from: 'Sveta', msg: 'Cool!'}      
    ]
}

let socket;


function sendChatAction(value) {
    socket.emit('chat message', value);
}


export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(messageReducer, initState);
 
    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(socketMessage){
            dispatch(receiveMessageAction(socketMessage));
        })
    }

    // Fetch current user
    const [curUser, setCurUser] = React.useState({});
    React.useEffect(() => {
        getAllUsers().then(allUsers => {
            setCurUser(indexArrayByKey(allUsers, 'user_id')[curUserID])
        });
    },[setCurUser])

    // Fetch all topics for the current user
    const [allTopics, setAllTopics] = React.useState([]);
    React.useEffect(() => {
        getAllTopics(curUserID).then(topics => setAllTopics(topics));
    },[setAllTopics])

    // Fetch all messages for the current user
    const [allMessages, setAllMessages] = React.useState([]);
    React.useEffect(() => {
        getAllMessages(curUserID).then(messages => {
            setAllMessages(groupArrayByKey(messages, 'message_chat_id'))
        });
    },[setAllMessages])

    return (
        <CTX.Provider value={{curUser, allTopics, allMessages, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}
