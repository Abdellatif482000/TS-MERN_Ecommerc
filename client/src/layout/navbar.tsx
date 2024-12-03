import { Link } from "react-router-dom";
// import Button from "flowbite-react";
// import { useState, useEffect, useRef } from "react";
import navBarStyles from "../cssModules/homePage.module.css";

export default function Navbar() {
  return (
    <nav className={navBarStyles.navBar}>
      <Link to={"/"}>
        <h1 className={navBarStyles.logo}>LOGO</h1>
      </Link>
      <input type="text" placeholder="Search" />

      <div className={navBarStyles.navBarBtns}>
        <button>singin</button>
      </div>
    </nav>
  );
}
