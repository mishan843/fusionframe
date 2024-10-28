import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { IconLink, IconSettings, IconUser, IconCalendar } from '@tabler/icons-react';
import FR from 'country-flag-icons/react/3x2/FR';
import CN from 'country-flag-icons/react/3x2/CN';
import NL from 'country-flag-icons/react/3x2/NL';
import IN from 'country-flag-icons/react/3x2/IN';

const FlagMenu = ({ anchorEl, open, handleClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: 400,
                    width: '18ch',
                    border: '1px solid rgba(0,0,0,.15)',
                    borderRadius: '0.25rem',
                },
            }}
        >
            <MenuItem onClick={handleClose} sx={{ gap: '10px', paddingRight: '20px' }}>
                <IN title="India" style={{ height: '20px', width: '20px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'large' }}>
                    India
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: '10px', paddingRight: '20px' }}>
                <FR title="France" style={{ height: '20px', width: '20px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'large' }}>
                    France
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: '10px', paddingRight: '20px' }}>
                <CN title="China" style={{ height: '20px', width: '20px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'large' }}>
                    China
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: '10px', paddingRight: '20px' }}>
                <NL title="Netherlands" style={{ height: '20px', width: '20px' }} />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: 'large' }}>
                    Dutch
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export default FlagMenu;
