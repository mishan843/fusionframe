// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

const enquiry = {
  id: 'enquiry',
  roles: ['admin', 'reseller','lco'], 
  children: [
    {
      id: 'enquiry',
      title: 'Enquiry',
      icon: icons.IconDashboard,
      type: 'collapse',
      children: [
        {
          id: 'enquiryList',
          title: 'Enquiry List',
          type: 'item',
          url: '/enquiry/enquirylist',
          target: false,
          roles: ['admin', 'reseller','lco'], 
        },
      ]
    },
  ],
};

export default enquiry;