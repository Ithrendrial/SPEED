import style from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import LoginGreen from "../styles/images/login-green.svg";
import LoginWhite from "../styles/images/login-white.svg";
import ProfileGreen from "../styles/images/logged-in-green.svg";
import ProfileWhite from "../styles/images/logged-in-white.svg";

interface NavbarProps {
  isHome: boolean;
}

export default function Navbar(props: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // User login state
  const [isModerator, setIsModerator] = useState(false); // User Moderator role state
  const [isAnalyst, setIsAnalyst] = useState(false); // User Analyst role state

  // Source for image determined by if nav bar is white or green, and whether user is logged in or not.
  const loginImageSrc = props.isHome
    ? isLoggedIn
      ? ProfileGreen
      : LoginGreen
    : isLoggedIn
    ? ProfileWhite
    : LoginWhite;

  let backgroundColor;
  let textColor;

  if (props.isHome) {
    backgroundColor = {
      backgroundColor: "#E5E7DE",
    };
    textColor = {
      color: "#334C1F",
    };
  } else {
    backgroundColor = {
      backgroundColor: "#334C1F",
    };
    textColor = {
      color: "#E5E7DE",
    };
  }

  return (
    <div className={style.bar} style={backgroundColor}>
      <Link className={style.title} style={textColor} href={"/"}>
        SPEED
      </Link>
      <div className={style.nav_wrapper}>
        <Link className={style.nav_items} style={textColor} href={"/about"}>
          ABOUT
        </Link>
        <Link className={style.nav_items} style={textColor} href={"/search"}>
          SEARCH
        </Link>
        <Link className={style.nav_items} style={textColor} href={"/submit"}>
          SUBMIT
        </Link>

        {/* If the user is a moderator or analyst, show additional nav item. */}
        {isModerator ? (
          <div className={style.nav_items} style={textColor}>
            ANALYSE
          </div>
        ) : null}
        {isAnalyst ? (
          <div className={style.nav_items} style={textColor}>
            ANALYSE
          </div>
        ) : null}
      </div>
      <div className={style.login}>
        {isLoggedIn ? (
          <div className={style.login_wrapper} style={textColor}>
            Name
          </div>
        ) : (
          <div>Log in</div>
        )}

        <Link href={"/login"}>
          <Image
            className={style.image}
            src={loginImageSrc}
            width={300}
            height={300}
            alt="Log In"
          />
        </Link>
      </div>
    </div>
  );
}
