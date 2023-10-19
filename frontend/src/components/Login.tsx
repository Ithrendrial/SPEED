"use client";

import style from "../styles/LoginPage.module.css";
import React, { useState } from "react";
import "@/styles/globals.css";

interface LogInProps {
  toggleSignUpState: (isClicked: boolean, e?: React.MouseEvent, ) => void;
  backgroundPressed: (isClicked: boolean, e?: React.MouseEvent) => void;
  handleIsModerator: (isModerator: boolean) => void;
  handleIsAnalyst: (isModerator: boolean) => void;
  handleSetUsername: (username: string) => void;
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

  // Attempt to sign in to existing account with form data //
  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let token;

    const accountType = document.querySelector(
      'input[name="accountType"]:checked'
    )?.id;

    if (!accountType) {
      alert('Please select an account type (Analyst or Moderator)');
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/authorize", {
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
      const response = await fetch("http://localhost:3001/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const user = await response.json();

      console.log("User:", JSON.stringify(user, null, 2));
      console.log("User role:", user["radioOption"]);

      if ("_id" in user) {
        // Check if the account type is a moderator or an analyst
        if (user["radioOption"] === "moderator") {
          props.handleIsModerator(true);
          props.handleIsAnalyst(false);
        } else if (user["radioOption"] === "analyst") {
          props.handleIsAnalyst(true);
          props.handleIsModerator(false);
        }

        // Pass the logged-in username to navbar to display and close modal
        props.handleSetUsername(user["uname"]);
        props.backgroundPressed(true);

        // If login details are incorrect, display prompt
        } else if (user.message === "Unauthorized" && user.statusCode === 401) {
            alert("Incorrect Login Details");
        } else {
            console.log("Unknown response");
        }
      } catch (error) {
            console.error("Error:", error);
      }
  }

  // Retrieve all account data from the database //
  async function getAll() {
    try {
      const response = await fetch("http://localhost:3001/users/all");
      const user = await response.text();
      console.log("User: " + user);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div
      className={style.background}
      onClick={(e) => props.backgroundPressed(true, e)}
    >
      <div className={ style.signInFormContainer }>
        <form
          className={ style.signInForm }
          onSubmit={ signIn }
          onClick={ (e) => e.stopPropagation() }
        >
          <div className={ style.heading }>SPEED</div>
          <div className={ style.subheading }>Log in</div>
          <input
            className={ style.input }
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className={ style.input }
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
            <div> {/* Account type selection (Moderator or Analyst) */}
              <input type="radio"
                     id="moderator"
                     name="accountType"/> Moderator <br></br>
              <input type="radio"
                     id="analyst"
                     name="accountType" /> Analyst </div> <br></br>

            {/* Form Submission Button */}
            <div className={ style.signUpButton }
                 onClick={(e) => props.toggleSignUpState(true, e)}>Sign Up</div>
            <button className={ style.submitButton }>Log In</button>
          </div>
        </form>
        <button onClick={ getAll }>Get all</button> {/* Retrieve all accounts in the database */}
      </div>
    </div>
  );
}
