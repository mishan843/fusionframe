import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Select, MenuItem, Paper } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock';
import { countriesTimezones } from './timezon/TimeZone';
import moment from 'moment-timezone';
import Calculator from './calculator/Calculator';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { getUserDetail, Updateuser } from 'services/UsersService';

const HomeData = () => {
    const [value, setValue] = useState(new Date());
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const [selectedTimezone, setSelectedTimezone] = useState(userdata?.world_clock || countriesTimezones[24].timezone);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userdata'));
        setSelectedTimezone(data?.world_clock || countriesTimezones[24].timezone);
        const interval = setInterval(() => setValue(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleTimezoneChange = async (event) => {
        try {
            setSelectedTimezone(event.target.value);

            const data = {
                world_clock: event.target.value,
            };
            const response = await Updateuser(data, userdata?._id);
            if (!response.error) {
                const data = await getUserDetail({ id: userdata?._id });

                const updatedUserData = JSON.parse(localStorage.getItem('userdata'));

                // Update the data
                updatedUserData.world_clock = data?.data?.world_clock;

                // Stringify the data
                const updatedData = JSON.stringify(updatedUserData);

                // Save the updated data
                localStorage.setItem('userdata', updatedData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentTimeInSelectedZone = () => {
        return moment.tz(value, selectedTimezone).format('HH:mm:ss');
    };

    const getCurrentDateInSelectedZone = () => {
        return moment.tz(value, selectedTimezone).format('MMMM Do YYYY');
    };

    return (
        <Box>
            <Grid container spacing={gridSpacing}
                sx={{
                    marginTop: 1,
                    marginLeft: 0,
                    width: '100%',
                    paddingRight: '24px'
                }}>
                <Grid item xs={12} md={6} lg={4} display="flex">
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                        <Typography sx={{ fontSize: '1.5rem', width: '100%', height: '50px', backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', paddingLeft: 2, color: 'white' }}>Calendar</Typography>
                        <Grid sx={{ padding: 2 }}>
                            <Calendar className={`w-100`} />
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4} display="flex">
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                        <Typography sx={{ fontSize: '1.5rem', width: '100%', height: '50px', backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', paddingLeft: 2, color: 'white' }}>Calculator</Typography>
                        <Grid sx={{ padding: 2, paddingBottom: 0 }}>
                            <Calculator />
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4} display="flex">
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography sx={{ fontSize: '1.5rem', width: '100%', height: '50px', backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', paddingLeft: 2, color: 'white' }}>World Clock</Typography>
                            <Grid sx={{ padding: 2, paddingBottom: 0 }}>
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography>{getCurrentDateInSelectedZone()}</Typography>
                                    <Typography>{getCurrentTimeInSelectedZone()}</Typography>
                                </Box>
                                <Select
                                    value={selectedTimezone}
                                    onChange={handleTimezoneChange}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: '300px', 
                                            },
                                        },
                                    }}
                                    fullWidth
                                    size="small"
                                >
                                    {countriesTimezones.map((zone) => (
                                        <MenuItem key={zone.timezone} value={zone.timezone}>
                                            {zone.country}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Clock value={moment.tz(value, selectedTimezone).format('HH:mm:ss')} timezone={selectedTimezone} />
                                </Box>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeData;