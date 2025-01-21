import React, { useEffect, useState } from "react";

import Card from "../ui/Card";
import ListOperation from "../ui/ListOperation";
import Loading from "../ui/Loading";
import { useGetLists, useSearchedLists } from "../features/lists/useList";
import { Spinner } from "react-bootstrap";

export default function Explorer() {
  const [data, setData] = useState(null),
    { searchedLists, isPending } = useSearchedLists(),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("created_at"),
    [asc, setAsc] = useState(false),
    [time, setTime] = useState("0");

  useEffect(() => {
    searchedLists(
      { query, sort, asc, time },
      {
        onSuccess: (result) => {
          setData(result);
          console.log(result);
        },
      }
    );
  }, [asc, query, sort, time]);

  return (
    <>
      <ListOperation
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        setAsc={setAsc}
        time={time}
        setTime={setTime}
      />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-1 row-cols-xl-3 gy-4 mx-auto w-100 px-2 px-sm-0">
        {isPending ? (
          <Spinner />
        ) : (
          data?.map((list) => <Card key={list.id} list={list} />)
        )}
      </div>
    </>
  );
}
