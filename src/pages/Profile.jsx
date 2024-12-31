import React from "react";

import Card from "../ui/Card";

import ProfileTop from "../features/profile/ProfileTop";
import { useGetPorfileList } from "../features/profile/useProfile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { profileId } = useParams();
  const { data, isLoading } = useGetPorfileList(profileId);
    
  return (
    <>
      <ProfileTop />
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {!isLoading && data.map((list) => <Card list={list} key={list.id} />)}
      </div>
    </>
  );
}
