import style from '../styles/Navbar.module.css';
import React, { useState } from 'react';
import LoginGreen from "@/styles/images/login-green.svg";
import LoginWhite from "@/styles/images/login-white.svg";
import ProfileGreen from "@/styles/images/logged-in-green.svg";
import ProfileWhite from "@/styles/images/logged-in-white.svg";

interface NavbarProps {
  isHome: boolean;
}

export default function Navbar(props: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const [isModerator, setIsModerator] = useState(false); // User Moderator role state
  const [isAnalyst, setIsAnalyst] = useState(false); // User Analyst role state

  // Source for image determined by if nav bar is white or green, and whether user is logged in or not.
  const loginImageSrc = props.isHome ? (isLoggedIn ? ProfileWhite: LoginWhite) : (isLoggedIn ? ProfileGreen : LoginGreen);

  return (
    <div className={style.bar}>
      <div className={style.title}>SPEED</div>
      <div className={style.nav_wrapper}>
        <div className={style.nav_items}>ABOUT</div>
        <div className={style.nav_items}>SEARCH</div>
        <div className={style.nav_items}>SUBMIT</div>

        {/* If the user is a moderator or analyst, show additional nav item. */}
        {isModerator ? (
          <div className={style.nav_items}>ANALYSE</div>
        ) : null}
        {isAnalyst ? (
          <div className={style.nav_items}>ANALYSE</div>
        ) : null}

      </div>
        <img src={loginImageSrc} alt="Log In" />
    </div>
  );
}