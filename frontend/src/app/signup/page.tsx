"use client";
import React, { useState } from "react";
import style from "../../styles/SignUpPage.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        body: JSON.stringify({
          uname: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const authorization = await response.text();
      console.log(authorization);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className={style.signUpFormContainer}>
      <form className={style.signUpForm} onSubmit={signup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
