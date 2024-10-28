import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/logo-icon.png'
import lightLogo from '../../../assets/images/logo-light-icon.png'
import logotext from '../../../assets/images/logo-text.png'
import whiteLogoText from '../../../assets/images/logo-light-text.png'
// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from 'config';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const isDark = useSelector((state) => state.customization.themeDark);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath} sx={{ gap: '5px' }}>
      {isDark ? <img src={lightLogo} alt="" style={{ height: '40px', width: '40px' }} /> : <img src={logo} alt="" style={{ height: '40px', width: '40px' }} />}
      {isDark ? <img src={whiteLogoText} alt="" style={{ height: '30px', width: '160px' }} /> : <img src={logotext} alt="" style={{ height: '30px', width: '160px' }} />}
    </ButtonBase>
  );
};

export default LogoSection;
