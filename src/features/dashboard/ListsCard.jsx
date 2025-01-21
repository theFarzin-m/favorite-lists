import React from "react";
import ListAvatar from "../../ui/ListAvatar";
import RecentListsCard from "./RecentListsCard";
import MostViewdCard from "./MostViewdCard";
import TopCard from "./TopCard";

export default function ListsCard() {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
      <div className="col">
        <RecentListsCard />
      </div>
      <div className="col">
        <MostViewdCard />
      </div>
      <div className="col">
        <TopCard />
      </div>
    </div>
  );
}
