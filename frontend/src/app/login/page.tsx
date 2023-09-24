"use client";

import style from "../../styles/LoginPage.module.css";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  async function signin(event) {
    event.preventDefault();
    console.log("form works");

    try {
      const response = await fetch("http://localhost:4000/auth", {
        method: "GET",
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
        <input type="text" />
        <br></br>
        <p>Password: </p>
        <input type="password" />
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
