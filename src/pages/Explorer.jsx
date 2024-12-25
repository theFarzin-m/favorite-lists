import React from "react";

import Card from "../ui/Card";
import ListOperation from "../ui/ListOperation";
import Loading from "../ui/Loading";
import { useGetLists } from "../features/lists/useList";

export default function Explorer() {
  const { isLoading, lists } = useGetLists();

  if (isLoading) return <Loading />;
  return (
    <>
      <ListOperation />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {lists?.map(list => 
        <Card key={list.id} list={list} />
      )}
      </div>
    </>
  );
}
