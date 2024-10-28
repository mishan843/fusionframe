import { IconUsersGroup } from '@tabler/icons-react';

const icons = { IconUsersGroup };

const userManagement = {
  id: 'userManagement',
  roles: ['admin', 'reseller','lco'], 
  children: [
    {
      id: 'userManagement',
      title: 'User Management',
      icon: icons.IconUsersGroup,
      type: 'collapse',
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/user-management/users',
          target: false,
          roles: ['admin'] 
        },
        {
          id: 'subscribers',
          title: 'Subscribers',
          type: 'item',
          url: '/user-management/subscribers',
          target: false,
          roles: ['admin', 'reseller','lco']
        },
        {
          id: 'role-management',
          title: 'Role Management',
          type: 'item',
          url: '/user-management/role-management',
          target: false,
          roles: ['admin'] 
        },
      ]
    }
  ]
};

export default userManagement;