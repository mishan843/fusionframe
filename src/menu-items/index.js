import personal from './personal';
import userManagement from './userManagement';
import networkPartners from './networkPartners';
import planManagement from './planManagement';
import billing from './billing';
import support from './support';
import enquiry from './enquiry';
import inventory from './inventory';
import reports from './reports';
import settings from './settings';
import nasManagement from './nasManagement';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [personal, userManagement, nasManagement, networkPartners, planManagement, billing, support, enquiry, inventory, reports, settings]
};

export default menuItems;