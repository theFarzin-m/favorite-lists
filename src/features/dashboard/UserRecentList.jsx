import React from "react";

import { useGetLists, useGetListsByProfileId } from "../lists/useList";

import { Spinner } from "react-bootstrap";
import RecentListItems from "./RecentListItems";
import Empty from "../../ui/Empty";

export default function UserRecentList({ profileId }) {
  const { lists, isLoading } = useGetListsByProfileId({ profileId });

  if (isLoading) return <Spinner />;

  return (
    <div className="card bg-focus custom-rounded-lg text-clear border-0">
      <div className="card-body">
        <h5 className="card-title">Your Recent Lists</h5>
        {lists.length < 1 ? (
          <Empty />
        ) : (
          <ul className="bg-focus border-0 text-clear mb-2 px-2">
            {lists.slice(0, 5).map((list) => (
              <RecentListItems list={list} key={list.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
