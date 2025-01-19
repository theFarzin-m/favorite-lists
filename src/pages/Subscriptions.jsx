import React, { lazy, useEffect, useRef, useState } from "react";

import { useGetSubscriptions } from "../features/profile/useProfile";
import { useSelector } from "react-redux";
import SubscriptionsRow from "../features/subscriptions/SubscriptionsRow";
import ListRow from "../features/subscriptions/ListRow";

export default function Subscriptions() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { data, isLoading } = useGetSubscriptions(profileId);
  const [selected, setSelected] = useState("");
  
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
