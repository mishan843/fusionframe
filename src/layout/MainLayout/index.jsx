import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import { SET_MENU } from 'store/actions';
import { drawerWidth } from 'store/constant';

// assets
import { useState } from 'react';
import ChatBoat from 'layout/ChatBot';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 60),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [headerOpened, setHeaderOpened] = useState(true);
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();

  const handleLeftDrawerToggle = () => {
    setHeaderOpened(!headerOpened);
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const handleMouseEnter = () => {
    if (!headerOpened) {
      dispatch({ type: SET_MENU, opened: true });
    }
  };
  const handleMouseLeave = () => {
    if (!headerOpened) {
      dispatch({ type: SET_MENU, opened: false });
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar sx={{ padding: '0 !important' }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
        onMouseEnter={leftDrawerOpened ? undefined : handleMouseEnter}
        onMouseLeave={leftDrawerOpened ? handleMouseLeave : undefined}
      />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened} >
        <Outlet />
      </Main>
      <Customization />
      <ChatBoat/>
    </Box>
  );
};

export default MainLayout;