import supabase from "./supabase";

export async function getLists() {
  const { data, error } = await supabase.from("list").select("*");

  if (error) {
    console.error(error);
    throw new Error("coudn't fetch lists");
  }

  return data;
}

export async function getAList(id) {
  let { data, error } = await supabase
    .from("list")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("coudn't fetch list");
  }

  const { data: profile, error2 } = await supabase
    .from("profile")
    .select("*")
    .eq("id", data.belongTo)
    .single();

  if (error2) {
    console.error(error);
    throw new Error("coudn't fetch profile");
  }

  data = {...data, belongTo: profile}

  return data;
}

export async function createEditList(newList) {
  const { data, error } = await supabase
    .from("list")
    .insert([newList])
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("coudn't fetch list");
  }
  return data;
}

export async function addLike({ userId, listId, newLikesCount }) {
  const { data, error } = await supabase
    .from("likes")
    .insert({ list: listId, user: userId })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error("sorry your like didn't count. try again");
  }

  const { error: errorUpdate } = await supabase
    .from("list")
    .update({ likes: newLikesCount })
    .eq("id", listId);

  if (errorUpdate) {
    const { error } = await supabase.from("likes").delete().eq("id", data);
    console.error(error);
    throw new Error("sorry your like didn't count. try again");
  }
}

export async function getLikes() {
  const { data, error } = await supabase.from("likes").select("*");

  if (error) {
    console.error(error);
    throw new Error("couden't get likes. try again");
  }

  return data;
}

export async function removeLike({ likeId, listId, newLikesCount }) {
  const { error: errorUpdate } = await supabase
    .from("list")
    .update({ likes: newLikesCount })
    .eq("id", listId);

  if (errorUpdate) {
    console.error(error);
    throw new Error("Sorry. try Again");
  }

  const { error } = await supabase.from("likes").delete().eq("id", likeId);

  if (error) {
    console.error(error);
    await supabase
      .from("list")
      .update({ likes: newLikesCount + 1 })
      .eq("id", listId);
    throw new Error("Sorry. try Again");
  }
}

export async function getBookmark({ userId }) {
  const { data, error } = await supabase
    .from("bookmark")
    .select("*")
    .eq("user", userId);

  if (error) {
    console.error(error);
    throw new Error("couden't get likes. try again");
  }

  return data;
}

export async function addBookmark({ userId, listId }) {
  const { error } = await supabase
    .from("bookmark")
    .insert({ list: listId, user: userId });

  if (error) {
    console.error(error);
    throw new Error("sorry your like didn't count. try again");
  }
}

export async function removeBookmark(bookmarkId) {
  const { error } = await supabase
    .from("bookmark")
    .delete()
    .eq("id", bookmarkId);

  if (error) {
    console.error(error);
    throw new Error("Sorry. try Again");
  }
}

export async function getUserLists(userId) {
  const { error } = await supabase
    .from("list")
    .select("*")
    .eq("belongTo", userId);

  if (error) {
    console.error(error);
    throw new Error("Sorry. try Again");
  }
}
