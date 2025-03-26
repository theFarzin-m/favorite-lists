import React from "react";

import Card from "../ui/Card";
import ListOperation from "../ui/ListOperation";
import Loading from "../ui/Loading";
import { useSearchedLists } from "../features/lists/useList";
import Empty from "../ui/Empty";

export default function Explorer() {
  const { lists, isLoading } = useSearchedLists();

  return (
    <>
      <ListOperation />
      {isLoading ? (
        <Loading />
      ) : lists.length < 1? (
        <Empty subTitle={"Try Diffrent Words and Filter"} title="Noting Found" />
      ) : (
        <div className="row g-4 mx-0 w-100">
          {lists?.map((list) => (
            <Card key={list.id} list={list} />
          ))}
        </div>
      )}
    </>
  );
}
