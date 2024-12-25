import React from "react";

import Card from "../ui/Card";
import Loading from "../ui/Loading";
import ListOperation from "../ui/ListOperation";
import AddList from "../features/dashboard/AddList";
import { useAuth } from "../features/authentication/useAuth";
import { useGetLists } from "../features/lists/useList";

export default function MyLists() {
  const { user, isLoading: LoadingUser } = useAuth();
  const { lists, isLoading: LoadingLists } = useGetLists();

  if (LoadingLists && LoadingUser) return <Loading />;

  const list = lists?.filter((list) => list.belongTo === user?.id);

  return (
    <>
      <ListOperation />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <AddList inRow="true" />

        {list !== undefined
          ? list.map((l) => <Card list={l} key={l.id} />)
          : "create your first list"}
      </div>
    </>
  );
}
