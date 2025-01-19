import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../authentication/useAuth";
import { useManageLikes } from "./useList";
import TooltipComponent from "../../ui/TooltipComponent";
import supabase from "../../services/supabase";

export default function LikeOparation({ likesCount, display }) {
  const { id: listId } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);
  const { likesActions, isLiking } = useManageLikes();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    async function getLikes() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("likes")
          .select("*")
          .eq("list", listId)
          .eq("userid", userId)
          .single();

        if (error) {
          throw error;
        }

        setLike(() => data);
        setIsLiked(() => (data ? 1 : 0));
      } catch (err) {
        console.log(err);
        setIsLiked(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (listId && userId) {
      getLikes();
    }
  }, [listId, user, like.length, userId, isLiking]);

  const handelLike = () => {
    if (!userId && !listId && isLiking) return;
    likesActions({
      listId,
      userId,
    });
  };

  return (
    <TooltipComponent tooltipText={`like ${likesCount}`} placement="top">
      <span
        className={`custom-centerize flex-column ${display ? "" : "d-none"}`}
        onClick={handelLike}
      >
        {isLiked ? (
          <i className="bi bi-suit-heart-fill text-danger fs-2"></i>
        ) : (
          <i className="bi bi-suit-heart fs-2"></i>
        )}
      </span>
    </TooltipComponent>
  );
}
