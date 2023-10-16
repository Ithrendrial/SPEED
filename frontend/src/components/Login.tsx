"use client";

import style from "../styles/LoginPage.module.css";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

interface LogInProps {
  toggleSignUpState: (e: React.MouseEvent, isClicked: boolean) => void;
  backgroundPressed: (e: React.MouseEvent, isClicked: boolean) => void;
}

export default function SignUp(props: LogInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const pathname = usePathname();
  const isHome = pathname === "/";

  async function signin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let token;

    const accountType = document.querySelector(
      'input[name="accountType"]:checked'
    )?.id;

    try {
      const response = await fetch("http://localhost:4000/auth/authorize", {
        method: "POST",
        body: JSON.stringify({
          uname: username,
          password: password,
          radioOption: accountType,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonToken = await response.text();
      console.log("Json Token: " + jsonToken);
      token = JSON.parse(jsonToken);
      console.log(token.access_token);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      console.log(token);
      const response = await fetch("http://localhost:4000/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const user = await response.text();
      console.log("User: " + user);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getAll() {
    try {
      const response = await fetch("http://localhost:4000/users/all");
      const user = await response.text();
      console.log("User: " + user);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div
      className={style.background}
      onClick={(e) => props.backgroundPressed(e, true)}
    >
      <div className={style.signInFormContainer}>
        <form
          className={style.signInForm}
          onSubmit={signin}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.heading}>SPEED</div>
          <div className={style.subheading}>Log in</div>
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <div>
              <input type="radio" id="moderator" name="accountType" /> Moderator
              <br></br>
              <input type="radio" id="analyst" name="accountType" /> Analyst
            </div>
            <br></br>
            <div
              className={style.signUpButton}
              onClick={(e) => props.toggleSignUpState(e, true)}
            >
              Sign Up
            </div>
            <button className={style.submitButton}>Log In</button>
          </div>
        </form>
        <button onClick={getAll}>Get all</button>
      </div>
    </div>
  );
}
