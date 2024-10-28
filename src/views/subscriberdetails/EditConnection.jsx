import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Divider, FormControlLabel, InputAdornment, Switch } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

export default function EditConnection({ open, setOpen }) {
    const [ipAddress, setIPAddress] = useState(false)
    const [blindMacAdd, setBlindMacAdd] = useState(false)

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} flexDirection={'column'}>
                    <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                        Edit Connection
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="location_zone" size="small">
                            Lcocation Zone
                        </InputLabel>
                        <Select
                            labelId="location_zone"
                            id="location_zone"
                            label="location_zone"
                            size="small"
                            name="location_zone"
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'Commercial'}>Commercial</MenuItem>
                            <MenuItem value={'Residential'}>Residential</MenuItem>
                            <MenuItem value={'Fiber'}>Fiber</MenuItem>
                            <MenuItem value={'Wireless'}>Wireless</MenuItem>
                            <MenuItem value={'Primium I'}>Primium I</MenuItem>
                            <MenuItem value={'Primium II'}>Primium II</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="location_node" size="small">
                            Lcocation Node
                        </InputLabel>
                        <Select
                            labelId="location_node"
                            id="location_node"
                            label="location_node"
                            size="small"
                            name="location_node"
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'Commercial'}>Commercial</MenuItem>
                            <MenuItem value={'Residential'}>Residential</MenuItem>
                            <MenuItem value={'Fiber'}>Fiber</MenuItem>
                            <MenuItem value={'Wireless'}>Wireless</MenuItem>
                            <MenuItem value={'Primium I'}>Primium I</MenuItem>
                            <MenuItem value={'Primium II'}>Primium II</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="distance_node"
                        label="Distance from node"
                        variant="outlined"
                        fullWidth
                        name="distance_node"
                        type="text"
                        margin="normal"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">Meters</InputAdornment>,
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        margin="normal"
                        size="small"
                        rows={4}
                        label="Comment"
                        name="comment"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                name="doNotChargeTax"
                                checked={ipAddress}
                                onChange={(e) => setIPAddress(e.target.checked)}
                            />
                        }
                        label="Fix IP Address"
                    />
                    {
                        ipAddress &&
                        <>
                            <Box border={'1px solid'} p={2} borderRadius={2}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="ip_pool" size="small">
                                        IP Pool
                                    </InputLabel>
                                    <Select
                                        labelId="ip_pool"
                                        id="ip_pool"
                                        label="ip_pool"
                                        size="small"
                                        name="ip_pool"
                                    >
                                        <MenuItem value={''}>Select ip pool</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <Button>Add New IP Address</Button> */}
                            </Box>
                        </>
                    }
                    <FormControlLabel
                        control={
                            <Switch
                                name="availableForHotspot"
                                checked={blindMacAdd}
                                onChange={(e) => setBlindMacAdd(e.target.checked)}
                            />
                        }
                        label="Bind MAC Address"
                    />
                    {
                        blindMacAdd &&
                        <>
                            <Box border={'1px solid'} p={2} borderRadius={2}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="allow_device" size="small">
                                        Allow Devices
                                    </InputLabel>
                                    <Select
                                        labelId="allow_device"
                                        id="allow_device"
                                        label="allow_device"
                                        size="small"
                                        name="allow_device"
                                    >
                                        <MenuItem value={'1'}>1</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box display={'flex'} justifyContent={'space-between'} m={1}>
                                    <Typography>MAC Address</Typography>
                                    <Typography>Delete</Typography>
                                </Box>
                                <Divider />
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <TextField
                                        id="mac_address"
                                        variant="outlined"
                                        width={'50%'}
                                        name="aftertext"
                                        margin="normal"
                                        size="small"
                                    />

                                    <Switch
                                        name="delete"
                                    />


                                </Box>
                            </Box>
                        </>
                    }
                    <FormControlLabel
                        control={
                            <Switch
                                name="availableForOnlinePayment"
                            />
                        }
                        label="Leased Line Subscriber"
                    />
                    <Box display={'flex'} gap={2} mt={2} justifyContent={'end'}>
                        <Button variant="contained" sx={{ width: '90px' }} >
                            Save
                        </Button>
                        <Button variant="contained" type="submit" sx={{ width: '90px' }} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}