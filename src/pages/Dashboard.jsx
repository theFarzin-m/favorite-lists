import React from "react";

import { useFetch } from "../hooks/usefetch";

import Chart from "../features/dashboard/Chart";
import AllDetails from "../features/dashboard/AllDetails";
import UserRecentList from "../features/dashboard/UserRecentList";
import AddList from "../features/dashboard/AddList";
import ListsCard from "../features/dashboard/ListsCard";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const profileId = useSelector((s) => s.profile.profileId);

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        <div className="col">
          <AllDetails />
          <UserRecentList profileId={profileId} />
        </div>
        <div className="col">
          <Chart />
          <AddList />
        </div>
      </div>
      <hr className="my-4" />
      <div className="h1 mb-3">Suggestions:</div>
      <ListsCard />
    </>
  );
}
