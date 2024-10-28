import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AppBar, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ViewBalance() {
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: backgroundColor }} >
                <Toolbar sx={{ padding: '0' }}>
                    <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>View Balance ₹0</Typography>
                </Toolbar>
            </AppBar>
            <Paper sx={{ padding: '10px', borderRadius: '0' }}>
                <Box display={'flex'} flexWrap={'wrap'} gap={1} justifyContent={'center'} p={1}>
                    <Button size='small' variant="outlined">0 Active Invoices</Button>
                    <Button size='small' variant="outlined">Add Invoice</Button>
                    <Button size='small' variant="outlined">0 Package Sales</Button>
                    <Button size='small' variant="outlined">View Payments</Button>
                    <Button size='small' variant="outlined">View Online Payments</Button>
                    <Button size='small' variant="outlined">Receive Payment</Button>
                    <Button size='small' variant="outlined">Tickets</Button>
                    <Button size='small' variant="outlined">Add New Ticket</Button>
                    <Select
                        id="qwer"
                        size="small"
                        name='qwer'
                        value='' // Add this prop
                    >
                        <MenuItem value={'qwer'}>qwer</MenuItem>
                    </Select>
                </Box>
            </Paper>
        </Box>
    );
}