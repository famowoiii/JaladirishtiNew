import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./NavbarStyle.css";

export const MyNavbar = (props) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="Navbar">
      <nav className={`navbar-wrapper ${menuActive ? "active" : ""}`}>
        <div className="navbar-title">
          <h2>Jaladirishti</h2>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`hamburger-icon ${menuActive ? "active1" : ""}`}>
            <FaBars size={26} />
          </div>
        </div>
        <ul className={`navbar-menu ${menuActive ? "active" : ""}`}>
          <li className="Beranda">
            <Link className="link" to="/">
              Beranda
            </Link>
          </li>
          <li className="laporan">
            <Link className="link" to="/laporan">
              Laporan
            </Link>
          </li>
          <li className="Berita">
            <Link className="link" to="/berita">
              Berita
            </Link>
          </li>
          <li className="Tentang">
            <Link className="link" to="/tentang">
              Tentang
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
