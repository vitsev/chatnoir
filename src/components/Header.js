
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
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

    const {curUser} = props;

    return (
        <div> 
        {   
            curUser &&

            <AppBar position="static">
                <Toolbar>
                    <Avatar alt="OOO" src={curUser['avatarPath']} />
                    <Typography variant="subtitle1" className={classes.avatarText}>
                        {curUser['user_name']}
                    </Typography>
                    <Typography variant="h5" className={classes.title}>
                        Chat Noir
                    </Typography>
                </Toolbar>
            </AppBar>
        }
        </div>
    )
}