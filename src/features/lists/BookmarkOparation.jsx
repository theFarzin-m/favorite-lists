import React, { useEffect, useState } from "react";
import TooltipComponent from "../../ui/TooltipComponent";
import { useParams } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import supabase from "../../services/supabase";
import { useAddBookmark, useRemoveBookmark } from "./useList";

export default function BookmarkOparation({ display }) {
  const { id: listId } = useParams();
  const [bookmark, setBookmark] = useState();
  const [isBooking, setISBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addBookmark, isPending: Bookmarking } = useAddBookmark();
  const { removeBookmark, isPending: isRemoving } = useRemoveBookmark();
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    async function getBookmark() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("bookmark")
          .select("*")
          .eq("list", listId)
          .eq("user", userId);

        if (error) {
          throw error;
        }

        setBookmark(() => data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (user && listId) {
      getBookmark();
    }
  }, [Bookmarking, isRemoving, listId, user, userId]);

  const handelBookmark = () => {
    if (bookmark.length) {
      let bookmarkId = bookmark[0].id;
      removeBookmark(bookmarkId);
    } else {
      addBookmark({ userId, listId });
    }
  };

  return (
    <TooltipComponent tooltipText="Bookmark" placement="top">
      <span
        className={`custom-centerize flex-column mx-4 ${
          display ? "" : "d-none"
        }`}
        onClick={handelBookmark}
        style={{
          cursor:
            !isRemoving && !isLoading && !Bookmarking ? "default" : "not-allowed",
        }}
      >
        {!isLoading && bookmark.length ? (
          <i className="bi bi-bookmark-fill text-info fs-2"></i>
        ) : (
          <i className="bi bi-bookmark fs-2"></i>
        )}
      </span>
    </TooltipComponent>
  );
}
