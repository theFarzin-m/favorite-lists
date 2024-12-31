import React from "react";
import ListOperation from "../ui/ListOperation";
import Card from "../ui/Card";
import { useParams } from "react-router-dom";
import { useGetBookmarkedLists } from "../features/profile/useProfile";

export default function Bookmarks() {
  const { profileId } = useParams();
  const { data, isLoading } = useGetBookmarkedLists(profileId);

  return (
    <>
      <ListOperation />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {!isLoading && data.map((list) => <Card list={list} key={list.id} />)}
      </div>
    </>
  );
}
