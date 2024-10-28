import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MenuList from './MenuList';
import { drawerWidth } from 'store/constant';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const isDark = useSelector((state) => state.customization.themeDark);

  const drawer = (
    <>
      {matchUpMd ? (
       <Box py={2}>
         <MenuList drawerOpen={drawerOpen} />
       </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          {drawerOpen &&
            <>
              <UserProfile />
              <MenuList />
            </>
          }
        </Box>
      )}
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={matchUpMd ? true : drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              md: drawerWidth,
              xs: drawerOpen ? drawerWidth : '60px',
            },
            height: matchUpMd ? 'calc(100vh - 69px)' : '100vh',
            bgcolor: isDark ? '#272c33' : theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            boxShadow: 'rgba(0, 0, 0, 0.08) 1px 0px 20px',
            [theme.breakpoints.up('md')]: {
              top: '69px'
            },
            transition: 'width 0.2s ease-in-out',
            overflowY: drawerOpen ? 'auto' : 'unset'
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;