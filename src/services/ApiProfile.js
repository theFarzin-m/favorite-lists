import supabase, { supabaseUrl } from "./supabase";

export async function getProfile(profileId) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("coudn't get profile");
  }

  return data;
}

export async function getCurrentProfile(userId) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user", userId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("coudn't get profile");
  }

  return data;
}

export async function updateProfile({ id, newData, avatar }) {
  // update password or fullname and avatar
  const { data, error } = await supabase
    .from("profile")
    .update({ ...newData })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (!avatar) return data;
  //  upload avatar
  const fileName = `${data.username}-avatar.png`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar, {
      cacheControl: "3600",
      upsert: true,
    });

  if (storageError) throw new Error(storageError.message);

  // update avatar in user
  const { data: updatedProfile, error: error2 } = await supabase
    .from("profile")
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    })
    .eq("id", id);

  if (error2) throw new Error(error2.message);

  return updatedProfile;
}

export async function getProfileLists(profileId) {
  const { data, error } = await supabase
    .from("list")
    .select("*")
    .eq("belongTo", profileId);

  if (error) {
    console.log(error);
    throw new Error("coudn't get lists");
  }

  return data;
}

export async function getBookmarkedLists(profileId) {
  const { data, error } = await supabase
    .from("bookmark")
    .select("*")
    .eq("user", profileId);

  if (error) {
    console.log(error);
    throw new Error("coudn't get lists");
  }

  return data;
}

export async function getSubscriptions(profileId) {
  const { data, error } = await supabase
    .from("bookmark")
    .select("*")
    .eq("subscription", profileId);

  if (error) {
    console.log(error);
    throw new Error("coudn't get lists");
  }

  return data;
}

export async function subscribApi({subscriberId, subscribedToId}) {
  // the best solution
  const { data, error } = await supabase.rpc('manage_subscription', {
    subscriber_id: subscriberId,
    subscribed_to_id: subscribedToId,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function unsubscribApi(id) {
  const { data, error } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("coudn't subscrib");
  }

  return data;
}
