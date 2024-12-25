import React from "react";

import Card from "../ui/Card";

import ProfileTop from "../features/profile/ProfileTop";


export default function Profile() {
  return (
    <>
      <ProfileTop  />
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* <Card /> */}
      </div>
    </>
  );
}
