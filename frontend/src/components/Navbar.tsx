import Link from "next/link";
import Image from 'next/image';
import React, { useState } from 'react';
import style from '../styles/Navbar.module.css';
import LoginGreen from '../styles/images/login-green.svg';
import LoginWhite from '../styles/images/login-white.svg';
import ProfileGreen from '../styles/images/logged-in-green.svg';
import ProfileWhite from '../styles/images/logged-in-white.svg';

interface NavbarProps {
  isNotHome: boolean; // Boolean that checks if the user is on the home page or not
}

export default function Navbar(props: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // User login state
  const [isModerator, setIsModerator] = useState(false); // User Moderator role state
  const [isAnalyst, setIsAnalyst] = useState(false); // User Analyst role state

  // Source for image determined by if nav bar is white or green, and whether user is logged in or not.
  const loginImageSrc = props.isNotHome
    ? isLoggedIn
      ? ProfileGreen // If user is not home and logged in, display green profile icon
      : LoginGreen // If user is not home and not logged in, display green login prompt icon
    : isLoggedIn
    ? ProfileWhite // If user is home and logged in, display white profile icon
    : LoginWhite; // If user is home and not logged in, display white login prompt icon

  let backgroundColor;
  let textColor;

  if(props.isNotHome){
    backgroundColor = {
      backgroundColor: "#E5E7DE" // If on the homepage, navbar background colour is white
    }
    textColor = {
      color: "#334C1F" // If on the homepage,  navbar text colour is dark green
    }
  } else {
    backgroundColor = {
      backgroundColor: "#334C1F" // If ont on the homepage, navbar background is green
    }
    textColor = {
      color: "#E5E7DE" // If not on the homepage, navbar text is white
    }
  }

    return (
      <div className={style.bar} style={ backgroundColor }> {/* Set Navbar background colour */}
        <Link className={style.title} style={ textColor } href={ "/" }>SPEED</Link> {/* Navbar link to homepage / application logo */}
        <div className={style.nav_wrapper}>
          <Link className={style.nav_items} style={ textColor } href={ "/about" }>ABOUT</Link> {/* Navbar link to about page */}
          <Link className={style.nav_items} style={ textColor } href={ "/search" }>SEARCH</Link> {/* Navbar link to search page */}
          <Link className={style.nav_items} style={ textColor } href={ "/submit" }>SUBMIT</Link> {/* Navbar link to submit page */}

          {/* If the user is a moderator or analyst, show additional nav item. */}
          {isModerator ? <Link className={style.nav_items} style={ textColor } href={ "/moderate" }>MODERATE</Link> : null}
          {isAnalyst ? <Link className={style.nav_items} style={ textColor } href={ "/analyse" }>ANALYSE</Link> : null}
        </div>

        <div className={style.login}>
          {isLoggedIn ?<div className={ style.login_wrapper} style={ textColor }>
            Name {/* If logged in, display username (placeholder) */}
          </div> :
            <div>Log in</div>} {/* If not logged in, display login prompt */}

          <Image // Image icon to click when wanting to log in
            className={ style.image }
            src={ loginImageSrc }
            width= {300}
            height={300}
            alt="Log In"
          />
        </div>
      </div>
    );
}
