import React from "react";
import { useGetListsByProfileId } from "../lists/useList";
import { Spinner } from "react-bootstrap";

import Card from "../../ui/Card";

// eslint-disable-next-line react/prop-types
export default function ListRow({ profileId }) {
  const { lists, isLoading } = useGetListsByProfileId({ profileId });

  if (isLoading) return <Spinner />;
  
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {lists.map((list) => (
        <Card key={list.id} list={list} />
      ))}
    </div>
  );
}
