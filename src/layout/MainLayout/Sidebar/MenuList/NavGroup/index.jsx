import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item, drawerOpen }) => {

  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} drawerOpen={drawerOpen} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} drawerOpen={drawerOpen} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <List sx={{ p: 0 }}>
      {items}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;