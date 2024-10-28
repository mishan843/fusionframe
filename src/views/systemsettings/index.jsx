import React, { useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Paper,
    Button,
} from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import About from './About';


const AlertsNotification = () => {
    const [selectedTab, setSelectedTab] = useState('about');
    const [edit, setEdit] = useState(false);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const breadcrumbs = [
        { label: 'Settings', link: '/' },
    ];

    return (
        <>
            <BreadcrumbsCommon
                heading={'System Settings'}
                breadcrumbs={breadcrumbs}
                typography={'System Settings'}
            />
            <Paper sx={{ margin: '20px', padding: '10px' }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Tabs value={selectedTab} onChange={handleChangeTab}>
                        <Tab label="About" value="about" />
                    </Tabs>
                    <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
                      {
                        !edit &&   <Button variant="contained" onClick={() => setEdit(true)}>Edit</Button>
                      }
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    {selectedTab === 'about' && <About edit={edit} setEdit={setEdit} />}
                </Box>
            </Paper>
        </>
    );
};

export default AlertsNotification;