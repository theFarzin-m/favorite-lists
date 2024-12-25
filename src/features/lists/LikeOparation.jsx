import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../authentication/useAuth";
import { useAddLike, useCheckLike, useRemoveLike } from "./useList";
import TooltipComponent from "../../ui/TooltipComponent";

export default function LikeOparation({ likesCount, display }) {
  const { id: listId } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);
  const { likes, isLoading: isCheking } = useCheckLike();
  const { addLike, isLiking } = useAddLike();
  const { removeLike, isRemoving } = useRemoveLike();
  
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (isCheking && !user) return;
    setLike(() =>
      likes?.filter(
        (like) => like.list === Number(listId) && like.user === user.id
      )
    );

    setIsLiked(() => like?.length);
  }, [isCheking, likes, listId, user, isRemoving, isLiking, like?.length]);

  const handelLike = () => {
    let newLikesCount = Number(likesCount);
    if (isLiked) {
      let likeId = like[0].id;
      newLikesCount = newLikesCount > 0 ? newLikesCount - 1 : newLikesCount;
      console.log(newLikesCount);
      removeLike({ likeId, listId, newLikesCount });
    } else {
      newLikesCount += 1;
      addLike({ listId, userId, newLikesCount });
    }
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
