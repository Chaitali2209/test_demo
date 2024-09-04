import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { openMenu, closeMenu } from "../animations";
import { ReactComponent as Logo } from "../assets/images/logo-full.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      openMenu();
    } else {
      closeMenu();
    }

    // Listen for route changes to close the menu
    const unlisten = () => {
      setMenuOpen(false);
    };

    return () => {
      unlisten();
    };
  }, [menuOpen, location.pathname]); // Trigger the effect on location change

  const menuToggle = () => {
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1500);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className={`logo header-item`}>
        <Link to="/">
          <h2 id="logo">Sharmil<span className="dev">.dev</span></h2>
        </Link>
      </div>
      <div
        onClick={menuToggle}
        className={`hamburger${menuOpen ? "__active" : ""} ${
          disabled ? "ham-disabled" : ""
        } header-item`}
      >
        <div className="hamburger-icon"></div>
      </div>
    </div>
  );
};

export default Header;
