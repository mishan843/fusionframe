import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Typography, Box, Tooltip } from '@mui/material';
import { Settings, PowerSettingsNew } from '@mui/icons-material';
import profile from '../../../../assets/images/user-profile.png'
import { IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const isDark = useSelector((state) => state.customization.themeDark);
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(JSON.parse(localStorage.getItem('userdata')));

  useEffect(() => {
    const userdataFromLocalStorage = JSON.parse(localStorage.getItem('userdata'));
    setUserdata(userdataFromLocalStorage);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingY={2}
      marginX={'auto'}
      bgcolor={isDark ? '#272c33' : 'white'}
      borderRadius={2}
      width={200}
    >
      <Box position="relative">
        <Avatar
          alt="Markarn Doe"
          src={userdata?.profile_picture?.url ? userdata?.profile_picture?.url : profile}
          sx={{ width: 60, height: 60 }}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          width={12}
          height={12}
          bgcolor="red"
          borderRadius="50%"
          border="2px solid white"
        />
      </Box>
      <>
        <Typography variant="h6" mt={1} sx={{ fontSize: '16px', color: '#455a64', fontWeight: 400 }}>
          {userdata?.name}
        </Typography>
        <Box display="flex" justifyContent="center" width="100%">
          <Tooltip title="My Profile" slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
            <IconButton sx={{ padding: '5px' }} onClick={() => navigate('/profiledetail')}>
              <IconUser style={{ height: '20px', width: '20px', color: isDark ? '#798699' : '#99abb4' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
            <IconButton sx={{ padding: '5px' }}>
              <Settings sx={{ width: 20, height: 20, color: isDark ? '#798699' : '#99abb4' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Log Out" slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
            <IconButton sx={{ padding: '5px' }} onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              localStorage.removeItem('userdata');
              navigate('/')
            }}>
              <PowerSettingsNew sx={{ width: 20, height: 20, color: isDark ? '#798699' : '#99abb4' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </>

    </Box>
  );
};

export default UserProfile;