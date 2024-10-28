import { useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import NavGroup from './NavGroup';
import menuItem from 'menu-items'; // Ensure this imports the full menu items
import { Context } from 'usecontext/ContextProvider';

const filterItemsByRole = (items, role) => {
  return items
    .filter(item => {
      // Check if the current item should be included based on the role
      const isItemVisible = item.roles ? item.roles.includes(role) : false;
      // Recursively filter children if item is visible
      const filteredChildren = item.children ? filterItemsByRole(item.children, role) : [];
      return isItemVisible || filteredChildren.length > 0;
    })
    .map(item => ({
      ...item,
      children: item.children ? filterItemsByRole(item.children, role) : [],
    }));
};


const MenuList = ({ drawerOpen }) => {
  const { role } = useContext(Context);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  // Assuming menuItem.items is an array of menu sections
  const filteredMenuItems = filterItemsByRole(menuItem.items, role);

  // Render the filtered menu items
  const navItems = filteredMenuItems.map((item) => (
    <NavGroup key={item.id} item={item} drawerOpen={matchUpMd ? drawerOpen : true} />
  ));

  return <>{navItems}</>;
};

export default MenuList;