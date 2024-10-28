import * as React from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';

const styleListText = { justifyContent: 'space-between', display: 'flex', margin: '0' }
const styleList = { paddingBottom: '4px', paddingTop: '4px' }

const SubscriberInfo = () => {
    return (
        <Paper sx={{ padding: 2, borderRadius: '5px' }}>
            <Typography variant="h6">
                → Currently Offline
            </Typography>
            <Typography variant="subtitle1">
                Last Login At
            </Typography>
            <Typography variant="subtitle1">
                Last Logged Nas Port
            </Typography>
            <Button variant="contained" sx={{ mb: 1 }} size='small'>
                View Access Requests
            </Button>
            <Divider />
            <Typography variant="h6" pt={1}>
                ✓ Total Data Used
            </Typography>
            <ListItem sx={styleList}>
                <ListItemText
                    primary="Total"
                    secondary="0 Bytes"
                    sx={styleListText}
                />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Uploaded" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Downloaded" secondary="0 Bytes" />
            </ListItem>
            <Divider />
            <Typography variant="h6" pt={1}>
                ✓ Data Used Today
            </Typography>
            <Typography variant="subtitle1">
                (- till now)
            </Typography>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Total" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Uploaded" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Downloaded" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Hours Used" secondary="NA" />
            </ListItem>
            <Divider />
            <Typography variant="h6" pt={1}>
                ✓ Data Used Monthly
            </Typography>
            <Typography variant="subtitle1">
                (- till now)
            </Typography>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Total" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Uploaded" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Downloaded" secondary="0 Bytes" />
            </ListItem>
            <ListItem sx={styleList}>
                <ListItemText sx={styleListText} primary="Hours Used" secondary="NA" />
            </ListItem>
            <Box display={'flex'} gap={2}>
                <Button variant="contained" size='small' sx={{ mt: 1 }}>
                    View Current Usage
                </Button>
                <Button variant="contained" size='small' sx={{ mt: 1 }}>
                    View All Previous Usage
                </Button>
            </Box>
        </Paper>
    );
};

export default SubscriberInfo;