import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />

      <div className="z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
