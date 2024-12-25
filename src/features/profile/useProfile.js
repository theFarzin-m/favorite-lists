import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../../services/ApiProfile";

export function useGetProfile(profileId) {
    const { data , isLoading, error}= useQuery({
        queryKey: ["profile", profileId],
        queryFn: () => getProfile(profileId)
    })



    return { data, isLoading, error}
}