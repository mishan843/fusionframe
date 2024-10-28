import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';


// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level, drawerOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const backgroundColor = useSelector((state) => state.customization.backgroundColor);
  const isDark = useSelector((state) => state.customization.themeDark);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const colorCondition = `${isDark && backgroundColor === '#67757c' ? '#1976d2' : backgroundColor} !important`;

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    ''
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        alignItems: 'flex-start',
        backgroundColor: level > 1 || isDark ? 'transparent !important' : 'inherit',
        py: level > 1 ? 0.75 : 1,
        pl: `${level * 24}px`,
        ...(customization.isOpen.findIndex((id) => id === item.id) > -1 && {
          color: colorCondition,
          '& .MuiListItemIcon-root': {
            color: colorCondition,
          },
          '& .MuiTypography-root': {
            color: colorCondition,
          },
        }),
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      {
        drawerOpen ? <ListItemIcon sx={{
          my: 'auto', minWidth: !item?.icon ? 18 : 36, '&:hover': {
            color: colorCondition,
          },
        }}>{itemIcon}</ListItemIcon>
          : ''
      }
      <ListItemText
        sx={{
          width: 'max-content'
        }}
        primary={
          <Typography sx={{
            pl: drawerOpen ? 2 : 0,
            width: 'fit-content',
            '&:hover': {
              color: colorCondition,
            },
          }} variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="#607d8b">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;