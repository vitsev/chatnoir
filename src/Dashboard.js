import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CommentIcon from '@material-ui/icons/Comment'
import MessageList from './components/MessageList'
import Header from './components/Header'
import ChatBox from './components/ChatBox'

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
        width: '200px',
        height: '300px',
        borderRight: '1px solid grey',
    },
    chatBox: {
        width: '85%'
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    // CTX store
    const {curUserID, allUsers, allTopics, allUserMessages, sendChatAction} = React.useContext(CTX);

    // Current user name 
    const curUser = allUsers && allUsers[curUserID];

    // Active Topic
    const [activeTopic, changeActiveTopic] = React.useState({});
    React.useEffect(() => {
        const firstTopic = allTopics[Object.keys(allTopics)[0]];
        changeActiveTopic(firstTopic);
    },[allTopics])

    return (
        <div>
            <Paper elevation={3} className={classes.root} >
                <Header curUser={curUser} />

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
                <ChatBox sendChatAction={sendChatAction} curUserID={curUserID} activeTopic ={activeTopic}/>
            </Paper>
        </div>
    )
}