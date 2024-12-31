import supabase from "./supabase";

export async function signupApi({ email, password, username, fullname }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data.id);
  
  const {error: error2} = await supabase.from("profile").insert({
    fullname,
    username,
    avatar: "",
    bio: "",
    user: data.id,
  })

  if(error2) throw new Error(error2.message)

  return data;
}

export async function LoginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function LogoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserApi({ email, password }) {
  // update password or fullname and avatar
  let updateData;
  if (password) updateData = { email, password };
  if (email) updateData = { email };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  console.log(data);
  
  return data;
}