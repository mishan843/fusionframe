// assets
import { IconTool } from '@tabler/icons-react';

// constant
const icons = { IconTool };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const inventory = {
    id: 'inventory',
    roles: ['admin', 'reseller','lco'], 
    children: [
        {
            id: 'dashboard',
            title: 'Inventory',
            icon: icons.IconTool,
            type: 'collapse',
            children: [
                {
                    id: 'inventoryManagement',
                    title: 'Inventory Management',
                    type: 'item',
                    url: '/inventory/management',
                    target: false,
                    roles: ['admin', 'reseller','lco'], 
                },
            ]
        },
    ],
};

export default inventory;