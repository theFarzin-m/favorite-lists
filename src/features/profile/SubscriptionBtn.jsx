import React, { useEffect, useState } from "react";
import { useGetCurrentProfile, useManageSubscription } from "./useProfile";
import supabase from "../../services/supabase";

export default function SubscriptionBtn({ subscriber }) {
  const { subscribActions, isPending: isSubscrib } = useManageSubscription();
  const { data: profile, isLoading } = useGetCurrentProfile();
  const [subscribData, setSubscribData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    async function getIsSubscrib() {
      try {
        setIsPending(true);

        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription", profile.id)
          .eq("subscriber", subscriber)
          .single();

        if (error) {
          throw error;
        }

        setSubscribData(() => data);
      } catch (err) {
        console.log(err);
        setSubscribData(null);
      } finally {
        setIsPending(false);
      }
    }

    if (subscriber && profile) {
      getIsSubscrib();
    }
  }, [profile, isSubscrib, subscriber]);

  const handelSubscrib = () => {
    if (!subscriber && !profile.id) return;
    subscribActions({
      subscriberId: subscriber,
      subscribedToId: profile.id,
    });
  };

  return (
    <>
      {!subscribData ? (
        <button
          className="btn bg-focus w-100 custom-rounded-md ms-0 text-clear"
          onClick={handelSubscrib}
          disabled={isSubscrib || isPending}
        >
          <i className="bi bi-person-add ms-2"></i>Subscrib
        </button>
      ) : (
        <button
          className="btn bg-focus w-100 custom-rounded-md ms-0 text-clear"
          onClick={handelSubscrib}
          disabled={isSubscrib || isPending}
        >
          <i className="bi bi-person-dash ms-2"></i>Unubscrib
        </button>
      )}
    </>
  );
}
