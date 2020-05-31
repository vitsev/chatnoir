import React from 'react'
import Paper from '@material-ui/core/Paper'
import TopicList from './components/TopicList'
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
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    // CTX store
    const {curUserID, allUsers, allTopics, allUserMessages, sendChatAction} = React.useContext(CTX);

    // Current user object 
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
                    <TopicList allTopics ={allTopics} changeActiveTopic={changeActiveTopic} /> 
                    <MessageList allUsers={allUsers} allUserMessages={allUserMessages} activeTopic ={activeTopic} />
                </div>
                <ChatBox curUserID={curUserID} activeTopic ={activeTopic} sendChatAction={sendChatAction} />
            </Paper>
        </div>
    )
}