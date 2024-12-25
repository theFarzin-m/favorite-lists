import React from "react";

import { useFetch } from "../hooks/usefetch";

import Chart from "../features/dashboard/Chart";
import AllDetails from "../features/dashboard/AllDetails";
import RecentList from "../features/dashboard/RecentList";
import AddList from "../features/dashboard/AddList";
import ListsCard from "../features/dashboard/ListsCard";



export default function Dashboard() {

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        <div className="col">
          <AllDetails />
          <RecentList />
        </div>
        <div className="col">
          <Chart />
          <AddList />
        </div>
      </div>
      <hr className="my-4" />
      <div className="h1 mb-3">Latest:</div>
      <ListsCard />
    </>
  );
}
