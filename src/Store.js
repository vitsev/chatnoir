import React from 'react'
import io from 'socket.io-client'

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


const reducer = (state, action) => {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
      case 'RECEIVE_MESSAGE':
        console.log("RM");  
        return {
          ...state,
          [topic]: [...state[topic], { from, msg }]
        };
      default:
        return state;
    }
  };

let socket;


function sendChatAction(value) {
    socket.emit('chat message', value);
}


const Store = props => {
    const [allChats, dispatch] = React.useReducer(reducer, initState);
 
    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
          dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        })
    }




    
    const user = 'Oleg' + Math.random(100).toFixed(2)

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;