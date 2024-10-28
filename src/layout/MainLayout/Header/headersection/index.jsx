import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, ButtonBase, Typography, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import config from 'config';
import profile from '../../../../assets/images/user-profile.png';
import lightLogo from '../../../../assets/images/logo-light-icon.png'
import whiteLogoText from '../../../../assets/images/logo-light-text.png'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderSection = ({ drawerOpen, handleLeftDrawerToggle }) => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const backgroundColor = useSelector((state) => state.customization.backgroundColor);
  const userdata = JSON.parse(localStorage.getItem('userdata'))
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="primary" sx={{ bgcolor: backgroundColor, boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            {!drawerOpen && <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath} sx={{ gap: '5px' }}>
              <img src={lightLogo} alt="" style={{ height: '35px', width: '35px' }} />
              <img src={whiteLogoText} alt="" style={{ height: '30px', width: '160px' }} />
            </ButtonBase>}
            <IconButton color="inherit" aria-label="menu" onClick={handleLeftDrawerToggle}>
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </IconButton>
          </Box>
          <Box
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            display="flex"
            gap={1} alignItems="center"
            sx={{ cursor: 'pointer' }}>
            <Avatar alt="User Name" src={userdata?.profile_picture?.url ? userdata?.profile_picture?.url : profile} sx={{ height: '30px', width: '30px' }} />
            <Typography display={{ sm: 'flex', xs: 'none' }}>{userdata?.name || userdata?.resellerName || userdata?.lcoName}</Typography>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => { navigate('/profiledetail') }}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              Profile Details
            </MenuItem>
            <MenuItem onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              localStorage.removeItem('userdata');
              navigate('/')
            }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HeaderSection;