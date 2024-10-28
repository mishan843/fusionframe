import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AppBar, Toolbar, IconButton, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import { useSelector } from 'react-redux';

const DataUsedBySubscriber = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const data = [
        {
            subscriberName: 'piyush tiwari',
            packageName: '',
            dataUsed: '0 Bytes',
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
                <Toolbar>
                    <IconButton color="inherit" className='py-0'>
                        <StorageIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: '1.5rem', flexGrow: 1 }}>Data Usage by Subscriber</Typography>
                </Toolbar>
            </AppBar>
            <Box>
                <Paper sx={{ borderRadius: '0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                            <Tab label="Today's" />
                            <Tab label="Monthly" />
                        </Tabs>
                    </Box>
                    {tabIndex === 0 && (
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Subscriber Name</TableCell>
                                            <TableCell>Package Name</TableCell>
                                            <TableCell>Data Used</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.subscriberName}</TableCell>
                                                <TableCell>{row.packageName}</TableCell>
                                                <TableCell>{row.dataUsed}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                    {tabIndex === 1 && (
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Subscriber Name</TableCell>
                                            <TableCell>Package Name</TableCell>
                                            <TableCell>Data Used</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.subscriberName}</TableCell>
                                                <TableCell>{row.packageName}</TableCell>
                                                <TableCell>{row.dataUsed}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default DataUsedBySubscriber;