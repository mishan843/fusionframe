// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const personal = {
  id: 'dashboard',
  roles: ['admin', 'reseller','lco'], 
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: icons.IconDashboard,
      type: 'collapse',
      children: [
        {
          id: 'overview',
          title: 'Overview',
          type: 'item',
          // url: '/dashboard/overview',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
        {
          id: 'realTimeStatistics',
          title: 'Real-time Statistics',
          type: 'item',
          url: '/dashboard/realtime-statistics',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
        {
          id: 'alertsNotification',
          title: 'Alerts & Notification',
          type: 'item',
          url: '/dashboard/alerts-notification',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
      ]
    },
  ],
};

export default personal;