
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    chatBox: {
        flexGrow: 1
    },
    flex: {
        display: 'flex',
    },
}));

export default function ChatBox(props) {
    const classes = useStyles();

    const {curUserID, activeTopic, sendChatAction} = props;

    const [textValue, changeTextValue] = React.useState('');

    return (
        <div className={classes.flex}>
            <TextField
                label="Send a message"
                className={classes.chatBox}
                variant="outlined"
                value={textValue}
                onChange={e => changeTextValue(e.target.value)}
            />
            <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                    sendChatAction({topicID: activeTopic['chat_id'], userID: curUserID, datetime: new Date(), text: textValue});
                    changeTextValue("");
                }}
            >
                Send
            </Button>
        </div>
    )

}