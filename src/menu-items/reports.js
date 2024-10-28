// assets
import { IconFileReport } from '@tabler/icons-react';

// constant
const icons = { IconFileReport };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reports = {
  id: 'reports',
  roles: ['admin', 'reseller', 'lco'],
  children: [
    {
      id: 'reports',
      title: 'Reports',
      icon: icons.IconFileReport,
      type: 'collapse',
      children: [
        {
          id: 'userReports',
          title: 'User Reports',
          type: 'item',
          // url: '/dashboard/overview',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
        {
          id: 'usageReports',
          title: 'Usage Reports',
          type: 'item',
          // url: '/dashboard/realTimeStatistics',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
        {
          id: 'customReports',
          title: 'Custom Reports',
          type: 'item',
          // url: '/dashboard/alertsNotification',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
      ]
    },
  ],
};

export default reports;