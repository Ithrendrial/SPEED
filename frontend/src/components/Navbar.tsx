import style from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import LoginGreen from "../styles/images/login-green.svg";
import LoginWhite from "../styles/images/login-white.svg";
import ProfileGreen from "../styles/images/logged-in-green.svg";
import ProfileWhite from "../styles/images/logged-in-white.svg";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

interface NavbarProps {
  isNotHome: boolean;
  isModerator: boolean;
  isAnalyst: boolean;
  username: string;
}

export default function Navbar(props: NavbarProps) {
  const [logInClicked, setLogInClicked] = useState<boolean>(false); // If true, render log in modal
  const [signUpClicked, setSignUpClicked] = useState<boolean>(false); // If true, render sign up modal

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // User login state
  const [isModerator, setIsModerator] = useState<boolean>(false); // User Moderator role state
  const [isAnalyst, setIsAnalyst] = useState<boolean>(false); // User Analyst role state
  const [username, setUsername] = useState<string>(""); // Retrieve and set logged in user's name

  // Identify log in button was clicked to open log in modal
  const toggleLogin = () => {
    setLogInClicked(!logInClicked);
  };

  // Identify background was pressed to close modal
  const backgroundPressed = () => {
    setSignUpClicked(false);
    setLogInClicked(false);
  };

  // Identify sign up button was pressed to switch from log in modal to sign up modal
  const toggleSignUpState = () => {
    setSignUpClicked(true);
    setLogInClicked(false);
  };

  // Identify log in button was pressed to switch from sign up modal to log in modal
  const toggleLogInState = () => {
    setLogInClicked(true);
    setSignUpClicked(false);
  };

  // Identify if moderator from modal prop
  function handleIsModeratorSet (isModerator: boolean){
    setIsModerator(isModerator);
  }

  // Identify if analyst from modal prop
  function handleIsAnalystSet (isAnalyst: boolean){
    setIsAnalyst(isAnalyst);
  }

  // Set username to passed value from log in modal
  function handleUsernameSet (username: string){
    setIsLoggedIn(true);
    setUsername(username);
  }

  // Source for image determined by if nav bar is white or green, and whether user is logged in or not.
  const loginImageSrc = props.isNotHome
    ? isLoggedIn
      ? ProfileGreen // If user is not home and logged in, display green profile icon
      : LoginGreen // If user is not home and not logged in, display green login prompt icon
    : isLoggedIn
    ? ProfileWhite // If user is home and logged in, display white profile icon
    : LoginWhite; // If user is home and not logged in, display white login prompt icon

  // Set navbar background and text colour depending on if on home page or not
  let backgroundColor;
  let textColor;

  if (props.isNotHome) {
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
    <>
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
            <Link
              className={style.nav_items}
              style={{ color: "#95AE3A" }}
              href={"/moderate"}
            >
              MODERATE
            </Link>
          ) : null}
          {isAnalyst ? (
            <Link
              className={style.nav_items}
              style={{ color: "#95AE3A" }}
              href={"/analyse"}
            >
              ANALYSE
            </Link>
          ) : null}
        </div>

        <div className={style.login}>
          {isLoggedIn ? (
            <div
              className={style.login_wrapper}
              style={textColor}
              onClick={toggleLogin}
            >
              {username}
            </div>
          ) : (
            <div
              className={style.login_wrapper}
              style={textColor}
              onClick={toggleLogin}
            >
              Log in
            </div>
          )}

          <Image
            className={style.image}
            src={loginImageSrc}
            onClick={toggleLogInState}
            width={300}
            height={300}
            alt="Log In"
          />
        </div>
      </div>
      {logInClicked ? (
        <Login
          toggleSignUpState={() => toggleSignUpState()}
          backgroundPressed={() => backgroundPressed()}
          handleSetUsername={handleUsernameSet}
          handleIsModerator={handleIsModeratorSet}
          handleIsAnalyst={handleIsAnalystSet}
        />
      ) : null}
      {signUpClicked ? (
        <SignUp
          toggleLogInState={() => toggleLogInState()}
          backgroundPressed={() => backgroundPressed()}
        />
      ) : null}
    </>
  );
}
