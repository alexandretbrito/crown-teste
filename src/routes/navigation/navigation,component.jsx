import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crown />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            LOJA
          </Link>
          <Link className="nav-link" to="/auth  ">
            ENTRAR
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
