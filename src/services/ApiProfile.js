import supabase from "./supabase";

export async function getProfile(profileId) {
    const { data, error} = await supabase.from("profile").select("*").eq("id", profileId).single()

    if(error){
        console.log(error)
        throw new Error("coudn't get profile")
    }

    return data
}