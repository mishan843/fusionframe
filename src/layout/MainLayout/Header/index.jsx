import PropTypes from 'prop-types';
import HeaderSection from './headersection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ drawerOpen, handleLeftDrawerToggle }) => {

  return (
    <>
      <HeaderSection drawerOpen={drawerOpen} handleLeftDrawerToggle={handleLeftDrawerToggle}/>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;