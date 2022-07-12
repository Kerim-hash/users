import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cookie from "cookie_js";

import { get_token } from "../../core/axios";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const logout = () => {
    cookie.remove("token");
    navigate("/login");
    window.location.reload();
  };

  console.log(user)

  return (
    <header className="header">
      <div className="header-items">
        <NavLink to="/">
          <img
            className="logo"
            src="https://www.nainitalriders.in/wp-content/uploads/2021/07/user-icon.png"
            alt="logo"
          />
        </NavLink>

        {!!!get_token() ? (
          <div className="header-links">
            <NavLink to="/login" className="header-link">
              <img
                src="https://icons.veryicon.com/png/o/object/material-design-icons-1/login-7.png"
                alt="login"
              />
              Login
            </NavLink>
            <NavLink to="/register" className="header-link">
              <img
                src="https://icons.veryicon.com/png/o/business/xbim/registration-1.png"
                alt="register"
              />
              Register
            </NavLink>
          </div>
        ) : (
          <div className="header-links">
            <p>{user.email}</p>
            <NavLink to="/account" className="header-link">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Icons8_flat_settings.svg/2048px-Icons8_flat_settings.svg.png"
                alt="congif"
              />
            </NavLink>
            <button className="header-link" onClick={() => logout()}>
              <img
                src="https://www.iconpacks.net/icons/2/free-exit-logout-icon-2857-thumb.png"
                alt="congif"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
