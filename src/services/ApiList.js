import supabase from "./supabase";

export async function getLists() {
  const { data, error } = await supabase.from("list").select("*");

  if (error) {
    console.error(error);
    throw new Error("coudn't fetch lists");
  }

  return data;
}

export async function getListsByProfileId(profileId) {
  
  const { data, error } = await supabase
  .from("list")
  .select("*")
  .eq("belongTo", profileId);
  
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

  data = { ...data, belongTo: profile };

  return data;
}

export async function createEditList({ newList, listId }) {
  if (listId) {
    const { data, error } = await supabase
      .from("list")
      .update(newList)
      .eq("id", Number(listId))
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("coudn't update list");
    }
    console.log(data);
    return data;
  } else {
    const { data, error } = await supabase
      .from("list")
      .insert([newList])
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("coudn't create list");
    }
    return data;
  }
}

export async function manageLikes({ userId, listId }) {
  const { data, error } = await supabase.rpc("manage_likes", {
    user_id: userId,
    list_id: listId,
  });

  if (error) {
    console.error(error);
    throw new Error("ERORR");
  }

  return data;
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

export async function addBookmark({ profileId, listId }) {
  const { error } = await supabase
    .from("bookmark")
    .insert({ list: listId, profile: profileId });

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

export async function increaseViewApi(listId) {
  const { data, error } = await supabase.rpc("increase_view", {
    list_id: listId,
  });

  if (error) {
    console.error(error);
    throw new Error("ERORR");
  }

  return data;
}
