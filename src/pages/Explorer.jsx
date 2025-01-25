import React from "react";

import Card from "../ui/Card";
import ListOperation from "../ui/ListOperation";
import Loading from "../ui/Loading";
import { useSearchedLists } from "../features/lists/useList";

export default function Explorer() {
  const { lists, isLoading } = useSearchedLists();

  return (
    <>
      <ListOperation />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-1 row-cols-xl-3 gy-4 mx-auto w-100 px-2 px-sm-0">
        {isLoading ? (
          <Loading />
        ) : (
          lists?.map((list) => <Card key={list.id} list={list} />)
        )}
      </div>
    </>
  );
}
