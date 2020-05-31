
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CommentIcon from '@material-ui/icons/Comment'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    topicWindow: {
        width: '200px',
        height: '300px',
        borderRight: '1px solid grey',
    },
}));

export default function TopicList(props) {
    const classes = useStyles();

    const {allTopics, changeActiveTopic} = props;

    return (
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
    )
}