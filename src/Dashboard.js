import React from 'react'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import CommentIcon from '@material-ui/icons/Comment'
import Typography from '@material-ui/core/Typography'
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
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '15px'
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
    const {allChats, sendChatAction, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    // Local state
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState('');

    return (
        <div>
            <Paper elevation={3} className={classes.root}>
                <Typography variant="h4" component="h4">
                    OL.Chat
                </Typography>
                <Typography variant="h5" component="h5">
                    Topic : {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem 
                                        onClick={()=>changeActiveTopic(topic)}
                                        key={topic} 
                                        button
                                    >
                                    <ListItemText primary={topic}/>
                                    <ListItemIcon>
                                        <CommentIcon />
                                    </ListItemIcon>   
                                </ListItem>                               
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map(chat => (
                                <div className={classes.flex}>
                                    <Chip
                                        avatar={<Avatar alt={chat.user} 
                                        src="/static/images/oleg.jpg" />}
                                        label={chat.msg}
                                    />
                                </div>
                            ))
                        }
                    </div>
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
                            sendChatAction({from: user, msg: textValue, topic: activeTopic});
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