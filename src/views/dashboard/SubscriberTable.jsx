import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Box,
    Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { gridSpacing } from 'store/constant';
import DataUsedBySubscriber from './DataUsedBySubscriber';
import { useSelector } from 'react-redux';

const SubscriberTable = () => {
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const data = [
        { label: 'Total', value: 1 },
        { label: 'Online', value: 0 },
        { label: 'Active', value: 0 },
        { label: 'Disabled', value: 0 },
        { label: 'Accts Renewed Today', value: 0 },
        { label: 'Total Advance Renewals Scheduled', value: 0 },
        { label: 'Accts Expired', value: 0 },
        { label: 'Expiring Today', value: 0 },
        { label: 'Expiring Today Without Adv. Renewal', value: 0 },
        { label: 'Expiring In Next 4 Days', value: 0 },
        { label: 'Expiring In Next 4 Days Without Adv. Renewal', value: 0 },
        { label: 'Accts Expired in Last 4 days', value: 0 },
        { label: 'Expiring Subscriber with Fixed IP in Next 4 Days', value: 0 }
    ];

    return (
        <Grid container spacing={gridSpacing}
            sx={{
                marginTop: 1,
                marginBottom: 4,
                marginLeft: 0,
                width: '100%',
                paddingRight: '24px'
            }}>
            <Grid item xs={12} md={6} lg={6} display="flex">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
                        <Toolbar>
                            <Typography sx={{ fontSize: '1.5rem', flexGrow: 1 }}>Subscribers</Typography>
                            {/* <IconButton color="inherit">
                                <BarChartIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <AddIcon />
                            </IconButton> */}
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <Paper sx={{ padding: 1.5, borderRadius: '0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ flexGrow: 1, fontSize: '16px' }}>
                                    View Subscriber
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder="Name/Phone/MA"
                                    variant="outlined"
                                    sx={{ marginRight: 1 }}
                                />
                                <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
                                    Go
                                </Button>
                            </Box>
                        </Paper>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <Paper sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                                    <Typography variant="body1">{item.label}:</Typography>
                                    <Typography variant="h6" align="right">
                                        {item.value}
                                    </Typography>
                                </Paper>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} display="flex">
                <DataUsedBySubscriber />
            </Grid>
        </Grid>
    );
};

export default SubscriberTable;