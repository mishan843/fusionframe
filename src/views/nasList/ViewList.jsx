import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', 
    maxHeight: '90vh', 
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    overflow: 'auto',
};

export default function ViewList({ open, setOpen, nasDetail }) {
    const handleClose = () => {
        setOpen(false)
    }

    const fields = [
        { label: 'Name', value: nasDetail?.name || '-' },
        { label: 'IP Address', value: nasDetail?.ipAddress || '-' },
        { label: 'API Port', value: nasDetail?.apiPort || '-' },
        { label: 'Shared Secret', value: nasDetail?.sharedSecret || '-' },
        { label: 'API Username', value: nasDetail?.apiUserName || '-' },
        { label: 'API Password', value: nasDetail?.apiPassword || '-' },
        { label: 'Vendor', value: nasDetail?.vendor || '-' },
        { label: 'B / W Graph URL', value: nasDetail?.bwGraphURL || '-' },
        { label: 'Gateway IP Address', value: nasDetail?.gatewayIPAdress || '-' },
    ];

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box p={2} sx={style}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography id="modal-modal-title" fontSize={'1.5rem'} mb={2}>
                            NAS
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ padding: '5px', height: 'fit-content' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Grid container spacing={1} mt={1}>
                        {fields.map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                                    <Typography variant="body1">{field.label} :</Typography>
                                    <Typography variant="h6" align="right">
                                        {field.value}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}