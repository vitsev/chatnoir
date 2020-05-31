
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CommentIcon from '@material-ui/icons/Comment'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    topicList: {
        width: '200px',
        height: '300px',
        borderRight: '1px solid grey',
    },
}));

export default function TopicList(props) {
    const classes = useStyles();

    const {allTopics, changeActiveTopic} = props;

    // State for controlling selected
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    return (
        <div className={classes.topicList}>
            <List>
                {
                    allTopics.map(topic => (
                        

                        <ListItem 
                            selected= {selectedIndex === allTopics.indexOf(topic) + 1}
                            key={topic.chat_id} 
                            button
                            onClick={()=>{
                                setSelectedIndex(allTopics.indexOf(topic) + 1)
                                changeActiveTopic(topic)
                            }}
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