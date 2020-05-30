import React from 'react'
import io from 'socket.io-client'
import messageReducer from './actions/MessageReducer'
import {receiveMessageAction} from './actions/MessageActions'
import {convertArrayToObject} from './utils/Utils'
import {getAllUsers} from './services/ChatService'
import {getAllTopics} from './services/ChatService'

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
        socket.on('chat message', function(msg){
            dispatch(receiveMessageAction(msg));
        })
    }

    // Fetch all users
    const [curUser, setCurUser] = React.useState({});
    React.useEffect(() => {
        getAllUsers().then(allUsers => {
            setCurUser(convertArrayToObject(allUsers, 'user_id')[curUserID])
        });
    },[setCurUser])

    // Fetch all topics for the current user
    const [allTopics, setAllTopics] = React.useState([]);
    React.useEffect(() => {
        getAllTopics(curUserID).then(t => setAllTopics(t));
    },[setAllTopics])

    return (
        <CTX.Provider value={{curUser, allTopics, allChats, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}
