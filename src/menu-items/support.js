// assets
import { IconTicket } from '@tabler/icons-react';

// constant
const icons = { IconTicket };

const support = {
    id: 'support',
    roles: ['admin', 'reseller', 'lco'],
    children: [
        {
            id: 'support',
            title: 'Support',
            icon: icons.IconTicket,
            type: 'collapse',
            children: [
                {
                    id: 'ticketingSystem',
                    title: 'Ticketing System',
                    type: 'item',
                    url: '/support/tickets',
                    target: false,
                    roles: ['admin', 'reseller', 'lco'],
                },
                {
                    id: 'ticketCategories',
                    title: 'Ticket Categories',
                    type: 'item',
                    url: '/support/ticket-categories',
                    target: false,
                    roles: ['admin', 'reseller', 'lco'],
                },
                {
                    id: 'knowledgeBase',
                    title: 'Knowledge Base',
                    type: 'item',
                    url: '/support/knowledge-base',
                    target: false,
                    roles: ['admin', 'reseller', 'lco'],
                },
            ]
        },
    ],
};

export default support;