import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { Box } from '@mui/system';

const NavCollapse = ({ menu, level, drawerOpen }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const backgroundColor = useSelector((state) => state.customization.backgroundColor);
  const isDark = useSelector((state) => state.customization.themeDark);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const colorCondition = `${isDark && backgroundColor === '#67757c' ? '#1976d2' : backgroundColor} !important`;

  const handleClick = () => {
    if (menu.type === 'item') {
      navigate(menu.url);
    } else {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    }
  };

  const handleMouseEnter = () => {
    if (!drawerOpen) {
      setOpen(true);
      setSelected(menu.id);
    }
  };

  const handleMouseLeave = () => {
    if (!drawerOpen) {
      setOpen(false);
      setSelected(null);
    }
  };

  const { pathname } = useLocation();
  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  useEffect(() => {
    // setOpen(false);
    setSelected(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} drawerOpen={drawerOpen} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} drawerOpen={drawerOpen} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      {drawerOpen ? (
        <>
          <ListItemButton
            sx={{
              borderRadius: `${customization.borderRadius}px`,
              mb: 0.5,
              alignItems: 'flex-start',
              backgroundColor: level > 1 || isDark ? 'transparent !important' : 'inherit',
              py: level > 1 ? 1 : 1.25,
              pl: `${level * 24}px`,
              '&:hover': {
                color: colorCondition,
                '& .MuiListItemIcon-root': {
                  color: colorCondition,
                },
                '& .MuiTypography-root': {
                  color: colorCondition,
                },
              },
              ...(selected === menu.id && {
                color: colorCondition,
                '.MuiListItemIcon-root': {
                  color: colorCondition,
                },
                '.MuiTypography-root': {
                  color: colorCondition,
                },
              }),
            }}
            selected={selected === menu.id}
            onClick={handleClick}
          >
            <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36, color: '#99abb4' }}>{menuIcon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="#607d8b" sx={{ my: 'auto' }}>
                  {menu.title}
                </Typography>
              }
              secondary={
                menu.caption && (
                  <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                    {menu.caption}
                  </Typography>
                )
              }
            />
            {open ? (
              <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
            ) : (
              <IconChevronRight stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                position: 'relative',
                '&:after': {
                  content: "''",
                  position: 'absolute',
                  left: '32px',
                  top: 0,
                  height: '100%',
                  width: '1px',
                  opacity: 1,
                  background: theme.palette.primary.light
                }
              }}
            >
              {menus}
            </List>
          </Collapse>
        </>
      ) : (
        <>
          <ListItemIcon
            sx={{ color: '#99abb4', display: 'inline', textAlign: 'center', position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Box py={1.5}>
              {menuIcon}
            </Box>
          </ListItemIcon>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                position: 'absolute',
                top: 0,
                left: '60px',
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                zIndex: theme.zIndex.appBar,
              }}
            >
              {menus}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  drawerOpen: PropTypes.bool
};

export default NavCollapse;