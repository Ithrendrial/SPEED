"use client";

import React, {useState} from "react";
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import '@/styles/globals.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isHome = (pathname === "/");

    const [showLogin, setShowLogin] = useState(false);
    const toggleSignup = () => {
        setShowLogin(!showLogin);
    };

  return (
    <html>
      <body>
        <Navbar isHome={ isHome }/>
        {children}
      </body>
    </html>)
}
