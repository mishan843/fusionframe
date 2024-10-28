// assets
import { IconBusinessplan } from '@tabler/icons-react';

// constant
const icons = { IconBusinessplan };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const planManagement = {
  id: 'planmanagement',
  roles: ['admin', 'reseller','lco'], 
  children: [
    {
      id: 'planManagement',
      title: 'Plan Management',
      icon: icons.IconBusinessplan,
      type: 'collapse',
      children: [
        {
          id: 'packageList',
          title: 'Package List',
          type: 'item',
          url: '/plan-management/packagelist',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
        {
          id: 'bilkRenew',
          title: 'Bulk Renew',
          type: 'item',
          url: '/plan-management/bulkrenew',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
      ]
    },
  ],
};

export default planManagement;