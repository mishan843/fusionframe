// assets
import { IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconSettings };

const settings = {
  id: 'settings',
  roles: ['admin', 'reseller', 'lco'],
  children: [
    {
      id: 'settings',
      title: 'Settings',
      icon: icons.IconSettings,
      type: 'collapse',
      children: [
        {
          id: 'systemSettings',
          title: 'System Settings',
          type: 'item',
          url: '/settings/system-settings',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
        {
          id: 'notificationSettings',
          title: 'Notification Settings',
          type: 'item',
          // url: '/dashboard/realTimeStatistics',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
        {
          id: 'securitySettings',
          title: 'Security Settings',
          type: 'item',
          // url: '/dashboard/alertsNotification',
          target: false,
          roles: ['admin', 'reseller', 'lco'],
        },
      ]
    },
  ],
};

export default settings;