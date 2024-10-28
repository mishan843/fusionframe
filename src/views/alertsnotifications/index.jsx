import React, { useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';


const AlertsNotification = () => {
    const [selectedTab, setSelectedTab] = useState('smsalerts');

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const breadcrumbs = [
        { label: 'Dashboard', link: '/' },
    ];

    return (
        <>
            <BreadcrumbsCommon
                heading={'Alerts & Notifications'}
                breadcrumbs={breadcrumbs}
                typography={'Alerts & Notifications'}
            />
            <Box sx={{ width: '100%' }} p={2}>
                <Tabs value={selectedTab} onChange={handleChangeTab}>
                    <Tab label="SMS Alerts" value="smsalerts" />
                    <Tab label="WhatsApp Alerts" value="wpalerts" />
                    <Tab label="Gmail Alerts" value="gmailalerts" />
                </Tabs>
                <Box sx={{ p: 2 }}>
                    {selectedTab === 'smsalerts' && ''}
                    {selectedTab === 'wpalerts' && ''}
                    {selectedTab === 'gmailalerts' && ''}
                </Box>
            </Box>
        </>
    );
};

export default AlertsNotification;