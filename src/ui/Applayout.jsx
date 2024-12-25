import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./SideBar";

const Loading = lazy(() => import("./Loading"));

export default function Applayout() {
  // if (true) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="container-xxl">
        <div className="py-5 custom-applayout">
          <div className="">
            <Sidebar />
          </div>
          <main className="px-lg-4 px-md-3 px-2 ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
