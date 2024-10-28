import { AppBar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux';
import StorageIcon from '@mui/icons-material/Storage';

const CurrentPreviousPackage = () => {
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    return (
        <>
            <Box>
                <Box>
                    <AppBar position="static" sx={{ backgroundColor: backgroundColor }} >
                        <Toolbar sx={{ padding: '0' }}>
                            <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}> Current Package not assigned</Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper sx={{ padding: '10px', borderRadius: '0' }}>
                        <Typography variant="body1" gutterBottom>
                            No Package is assigned to subscriber.
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            You need at least one
                            <Button variant="text" size='small' color="primary">
                                Active Location Package with
                            </Button>
                            <Button variant="contained" size='small' color="error">
                                Residential type
                            </Button>
                        </Typography>
                    </Paper>
                </Box>
                <Box mt={2}>
                    <AppBar position="static" sx={{ backgroundColor: backgroundColor }} >
                        <Toolbar sx={{ padding: '0', paddingLeft: '16px !important' }}>
                            <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}> <StorageIcon className='me-1' />Previous Package Usage</Typography>
                            <Button variant="contained" size='small' color="primary">
                                See all sales for piyush tiwari
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <TableContainer component={Paper} mt={2} sx={{ borderRadius: '0' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Usage Start Date</TableCell>
                                    <TableCell align="right">Package</TableCell>
                                    <TableCell align="right">Usage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell >
                                        2023-03-01
                                    </TableCell>
                                    <TableCell align="right">Basic</TableCell>
                                    <TableCell align="right">10GB</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        2023-04-01
                                    </TableCell>
                                    <TableCell align="right">Premium</TableCell>
                                    <TableCell align="right">50GB</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box >
        </>
    )
}

export default CurrentPreviousPackage