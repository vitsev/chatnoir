import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Jutsu from './Jutsu'

export default function VideoDialog(props) {

    const { open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Video Call</DialogTitle>
            <div>
            <Jutsu
                roomName="jhgjhkgfkkgfkgfkgf"
                userName="Oleg"
                loadingComponent={<p>loading ...</p>} />
            </div>
        </Dialog>
    );
}