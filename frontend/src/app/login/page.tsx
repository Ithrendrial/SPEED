"use client";

import style from "../../styles/LoginPage.module.css";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const pathname = usePathname();
  const isHome = pathname === "/";

  async function signin(event) {
    event.preventDefault();
    let token;

    try {
      const response = await fetch("http://localhost:4000/auth/authorize", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
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

  return (
    <div className={style.signInFormContainer}>
      <form className={style.signInForm} onSubmit={signin}>
        <p>Username: </p>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <br></br>
        <p>Password: </p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br></br>
        <button>Submit</button>
        <br></br>
        <br></br>
        <Link href={"/signup"}>Sign Up</Link>
      </form>
    </div>
  );
}
