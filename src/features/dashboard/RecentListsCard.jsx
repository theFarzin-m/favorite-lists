import React from "react";
import { Spinner } from "react-bootstrap";

import RecentListItems from "./RecentListItems";
import { useGetLists } from "../lists/useList";

export default function RecentListsCard() {
  const { lists, isLoading } = useGetLists();

  if (isLoading) return <Spinner />;
  return (
    <div className="card bg-focus custom-rounded-lg text-clear border-0">
      <div className="card-body">
        <h5 className="card-title">Recent Lists</h5>
        <ul className="bg-focus border-0 text-clear mb-2 p-0">
          {lists.slice(0, 5).map((list) => (
            <RecentListItems list={list} key={list.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}