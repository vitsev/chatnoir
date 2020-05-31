import React from 'react'
import List from '@material-ui/core/List'
import MessageItem from './MessageItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '15px'
    }
}));

export default function MessageList(props) {
    const classes = useStyles();
    
    const {allUsers, allUserMessages, activeTopic} = props;

    return (
        <div className={classes.chatWindow}>
        {
            allUsers &&
            activeTopic &&
            activeTopic.hasOwnProperty('chat_id') &&
            allUserMessages[activeTopic['chat_id']] &&
            
            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {
                allUserMessages[activeTopic['chat_id']].map(message => (
                    allUsers[message.message_user_id] &&

                    <MessageItem 
                        user={allUsers[message.message_user_id]} 
                        message={message} 
                        key={message.message_datetime}
                    />

                ))
                }
            </List>
        }
        </div>
    )

}