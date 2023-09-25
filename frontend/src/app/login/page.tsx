"use client";

import style from "../../styles/LoginPage.module.css";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

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

    try {
      const response = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          uname: username,
          pass: password,
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
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={signin}>
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
      </form>
    </div>
  );
}
