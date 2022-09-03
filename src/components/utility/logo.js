import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo/trslogo.png';

const Logo = ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard/docs">
              <img src={logo} width="50" alt="Site Icon" />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard/docs">
            {/* <div class="sc-logo-header logo"></div> */}
            <img src={logo} width="110" alt="BARQ Logo" />
          </Link>
        </h3>
      )}
    </div>
  );
};

export default Logo;