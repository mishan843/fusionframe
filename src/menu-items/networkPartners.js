// assets
import { IconNetwork } from '@tabler/icons-react';

// constant
const icons = { IconNetwork };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const networkPartners = {
    id: 'networkPartners',
    roles: ['admin', 'reseller'],
    children: [
        {
            id: 'networkPartners',
            title: 'Network Partners',
            icon: icons.IconNetwork,
            type: 'collapse',
            children: [
                {
                    id: 'resellerManagement',
                    title: 'Reseller Management',
                    type: 'item',
                    url: '/network-partners/reseller',
                    target: false,
                    roles: ['admin'],
                },
                {
                    id: 'lcoManagement',
                    title: 'LCO Management',
                    type: 'item',
                    url: '/network-partners/lco',
                    target: false,
                    roles: ['admin', 'reseller'],
                },
            ]
        },
    ],
};

export default networkPartners;