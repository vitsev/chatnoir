import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    }
}));

export default function MessageItem(props) {
    const classes = useStyles();

    const {user, message} = props;

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user['user_name']} src={user['avatarPath']} />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <React.Fragment>
                            {user['user_name']}
                            
                            <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                            >
                                {'  -  ' + message.message_datetime}
                            </Typography>
                            
                        </React.Fragment>
                        
                    }
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {message.message_text}
                        </Typography>
                    }
                />
            </ListItem>

            <Divider variant="inset" component="li" />
        </div>
    )
}