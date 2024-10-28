// assets
import { IconFileInvoice } from '@tabler/icons-react';

// constant
const icons = { IconFileInvoice };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const billing = {
    id: 'billing',
    roles: ['admin', 'reseller','lco'], 
    children: [
        {
            id: 'billing',
            title: 'Billing',
            icon: icons.IconFileInvoice,
            type: 'collapse',
            children: [
                {
                    id: 'invoiceManagement',
                    title: 'Invoice Management',
                    type: 'item',
                    url: '/billing/invoice-management',
                    target: false,
                    roles: ['admin', 'reseller','lco'], 
                },
                // {
                //     id: 'paymentProcessing',
                //     title: 'Payment Processing',
                //     type: 'item',
                //     // url: '/dashboard/realTimeStatistics',
                //     target: false,
                //     roles: ['admin', 'reseller','lco'], 
                // },
                // {
                //     id: 'billingCycles',
                //     title: 'Billing Cycles',
                //     type: 'item',
                //     // url: '/dashboard/alertsNotification',
                //     target: false,
                //     roles: ['admin', 'reseller','lco'], 
                // },
                {
                    id: 'discountsAndPromotions',
                    title: 'Discounts and Promotions',
                    type: 'item',
                    url: '/billing/discountandpro',
                    target: false,
                    roles: ['admin', 'reseller','lco'], 
                },
            ]
        },
    ],
};

export default billing;