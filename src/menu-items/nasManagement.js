// assets
import { IconManualGearbox } from '@tabler/icons-react';
// constant
const icons = { IconManualGearbox };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const nasManagement = {
    id: 'nasmanagement',
    roles: ['admin'],
    children: [
        {
            id: 'nasManagement',
            title: 'NAS Management',
            icon: icons.IconManualGearbox,
            type: 'collapse',
            children: [
                {
                    id: 'nasList',
                    title: 'NAS List',
                    type: 'item',
                    url: '/nas-management/naslist',
                    target: false,
                    roles: ['admin'],
                },
            ]
        },
    ],
};

export default nasManagement;