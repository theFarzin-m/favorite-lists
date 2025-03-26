import React from "react";

import SwitchMod from "./SwitchMod";

export default function Navbar() {
  return (
    <nav className="navbar bg-focus sticky-top" style={{zIndex: 10}}>
      <div className="container-xxl">
        <h1 className="pt-2 px-3 text-primary-clear fs-1">
          Favorite List
        </h1>
        <SwitchMod />
      </div>
    </nav>
  );
}
