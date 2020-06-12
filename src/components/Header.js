import React from 'react'
import VideoDialog from './VideoDialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import VideoCam from '@material-ui/icons/Videocam';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    avatarText: {
      marginLeft: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();

    const {curUser, activeTopic} = props;

    // State for controling show/hide of the Video Dialog
    const [open, setOpen] = React.useState(false);
    const handleOpen = (event) => {
        setOpen(true);
    };
    const handleClose = (event) => {
        setOpen(false);
    };

    return (
        <div> 
        {   
            curUser && activeTopic &&

            <AppBar position="static">
                <Toolbar>
                    <Avatar alt="OOO" src={curUser['avatarPath']} />
                    <Typography variant="subtitle1" className={classes.avatarText}>
                        {curUser['user_name']}
                    </Typography>
                    <Typography variant="h5" className={classes.title}>
                        Chat Noir
                    </Typography>
                    <IconButton
                        aria-label="Video Call"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpen}
                        color="inherit"
                    >
                        <VideoCam />
                    </IconButton>
                    <VideoDialog open={open} onClose={handleClose} curUser={curUser} activeTopic={activeTopic}/>
                </Toolbar>
            </AppBar>
        }
        </div>
    )
}