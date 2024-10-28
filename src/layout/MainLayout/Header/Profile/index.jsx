import React from 'react';
import { Divider, Menu, MenuItem, Typography } from '@mui/material';
import { CiSettings } from "react-icons/ci";
import { FaPowerOff } from "react-icons/fa";
import { IconUser } from '@tabler/icons-react';

const ProfileMenu = ({ anchorEl, open, handleClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: 400,
                    width: '35ch',
                    border: '1px solid rgba(0,0,0,.15)',
                    borderRadius: '0.25rem',
                },
            }}
        >
            <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
                <IconUser style={{ height: '24px', width: '24px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'medium' }}>
                    My Profile
                </Typography>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
                <CiSettings style={{ height: '24px', width: '24px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'medium' }}>
                    Settings
                </Typography>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
                <FaPowerOff style={{ height: '24px', width: '24px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'medium' }}>
                    Logout
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
