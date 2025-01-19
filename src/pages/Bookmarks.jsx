import React, { useEffect, useState } from "react";
import ListOperation from "../ui/ListOperation";
import Card from "../ui/Card";
import { useSelector } from "react-redux";
import supabase from "../services/supabase";

export default function Bookmarks() {
  const profileId = useSelector((s) => s.profile.profileId);
  const [lists, setLists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookmark() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("bookmark")
        .select("list(*)")
        .eq("profile", profileId);

      if (error) {
        console.error(error);
        setIsLoading(false);
        throw new Error("error");
      }

      setLists(data);
      setIsLoading(false);
    }

    if (profileId) {
      getBookmark();
    }
  }, [profileId]);

  if (isLoading) return;

  return (
    <>
      <ListOperation />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {lists.map((list) => (
          <Card list={list.list} key={list.list.id} />
        ))}
      </div>
    </>
  );
}
