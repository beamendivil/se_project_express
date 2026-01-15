import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch";
import logoImage from "../assets/Logo (1).png";
import avatarImage from "../assets/avatar.png";

function Header({ onAddClothesClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentLocation = weatherData?.city || "New York, NY";
  const userName = "Terrence Tegegne";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img
              src={logoImage}
              alt="WTWR Logo"
              className="header__logo-image"
            />
          </Link>
          <div className="header__date-location">
            <p className="header__date">
              {currentDate}, {currentLocation}
            </p>
          </div>
        </div>

        <div className="header__right">
          <ToggleSwitch />
          <button
            className="header__add-button"
            onClick={onAddClothesClick}
            type="button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__user">
            <p className="header__user-name">{userName}</p>
            <img
              src={avatarImage}
              alt={userName}
              className="header__user-avatar"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`header__mobile-menu-btn ${
            isMobileMenuOpened
              ? "header__mobile-menu-btn_close"
              : "header__mobile-menu-btn_hamburger"
          }`}
          onClick={toggleMobileMenu}
          type="button"
          aria-label="Toggle mobile menu"
        >
          <span className="header__mobile-menu-line"></span>
          <span className="header__mobile-menu-line"></span>
          <span className="header__mobile-menu-line"></span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`header__mobile-menu ${
          isMobileMenuOpened ? "header__mobile-menu_opened" : ""
        }`}
      >
        <div className="header__mobile-menu-content">
          <div className="header__mobile-date-location">
            <p className="header__mobile-date">{currentDate}</p>
            <p className="header__mobile-location">{currentLocation}</p>
          </div>
          <ToggleSwitch />
          <button
            className="header__mobile-add-button"
            onClick={onAddClothesClick}
            type="button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__mobile-user">
            <img
              src={avatarImage}
              alt={userName}
              className="header__mobile-user-avatar"
            />
            <p className="header__mobile-user-name">{userName}</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
