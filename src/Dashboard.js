import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CommentIcon from '@material-ui/icons/Comment'
import MessageList from './components/MessageList'
import Header from './components/Header'

import { makeStyles } from '@material-ui/core/styles'

import { CTX } from './Store'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    // CTX store
    const {curUserID, allUsers, allTopics, allUserMessages, sendChatAction} = React.useContext(CTX);

    // Current user name 
    const curUserName = allUsers && allUsers[curUserID] && allUsers[curUserID]['user_name'];

    // Active Topic
    const [activeTopic, changeActiveTopic] = React.useState({});
    React.useEffect(() => {
        const firstTopic = allTopics[Object.keys(allTopics)[0]];
        changeActiveTopic(firstTopic);
    },[allTopics])

    const [textValue, changeTextValue] = React.useState('');

    return (
        <div>
            <Paper elevation={3} className={classes.root} >
                <Header curUserName={curUserName} />

                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List>
                            {
                                allTopics.map(topic => (
                                    <ListItem 
                                        onClick={()=>changeActiveTopic(topic)}
                                        key={topic.chat_id} 
                                        button
                                    >
                                    <ListItemText primary={topic.chat_topic}/>
                                    <ListItemIcon>
                                        <CommentIcon />
                                    </ListItemIcon>   
                                </ListItem>                               
                                ))
                            }
                        </List>
                    </div>
                    <MessageList allUsers={allUsers} allUserMessages={allUserMessages} activeTopic ={activeTopic}/>
                </div>
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
            </Paper>
        </div>
    )
}