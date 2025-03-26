import React, { useState } from "react";

import { useGetSubscriptions } from "../features/profile/useProfile";
import { useSelector } from "react-redux";
import SubscriptionsRow from "../features/subscriptions/SubscriptionsRow";
import ListRow from "../features/subscriptions/ListRow";
import Empty from "../ui/Empty";
import Loading from "../ui/Loading";

export default function Subscriptions() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { data, isLoading } = useGetSubscriptions(profileId);
  const [selected, setSelected] = useState("");

  if (isLoading) return <Loading />;

  if (data.length < 1)
    return (
      <Empty
        title="No one Subscripted"
        subTitle="subscrib somje one and check again"
      />
    );

  return (
    <>
      {!isLoading && (
        <SubscriptionsRow
          data={data}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      <hr />
      {selected && <ListRow profileId={selected} />}
    </>
  );
}
