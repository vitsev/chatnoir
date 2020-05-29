import React from 'react'
import io from 'socket.io-client'
import messageReducer from './actions/MessageReducer'
import {receiveMessageAction} from './actions/MessageActions'

export const CTX = React.createContext();

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


const Store = props => {
    const [allChats, dispatch] = React.useReducer(messageReducer, initState);
 
    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            dispatch(receiveMessageAction(msg));
        })
    }

    const user = 'Oleg' + Math.random(100).toFixed(2)

    const [allUsers, setAllUsers] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })
        .then(res => res.json())
        .then(response => {
            setAllUsers(response);
        })
        .catch(error => console.log(error));
    }, [setAllUsers]);

    return (
        <CTX.Provider value={{allChats, allUsers, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;