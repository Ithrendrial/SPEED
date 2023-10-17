"use client";

import React from "react";
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
  return (
    <html>
      <body>
        <Navbar isNotHome={ isHome }/>
        {children}
      </body>
    </html>)
}
