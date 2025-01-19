import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProfile,
  updateProfile as updateProfileApi,
  getProfileLists,
  getBookmarkedLists,
  getSubscriptions,
  getCurrentProfile,
  manageSubscription,
} from "../../services/ApiProfile";
import toast from "react-hot-toast";
import { useAuth } from "../authentication/useAuth";
import { useEffect } from "react";

export function useGetProfile(profileId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfile(profileId),
  });
  return { data, isLoading, error };
}

export function useGetCurrentProfile() {
  const { user } = useAuth();
  const userId = user.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getCurrentProfile(userId),
  });
  return { data, isLoading, error };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfileApi,

    onSuccess: () => {
      toast.success("your profile update successfuly");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateProfile, isUpdating };
}

export function useGetPorfileList(profileId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list", profileId],
    queryFn: () => getProfileLists(profileId),
  });
  return { data, isLoading, error };
}

export function useGetBookmarkedLists(profileId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookmark", profileId],
    queryFn: () => getBookmarkedLists(profileId),
  });
  return { data, isLoading, error };
}

export function useGetSubscriptions(profileId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscribtions", profileId],
    queryFn: () => getSubscriptions(profileId),
  });
  return { data, isLoading, error };
}

export function useManageSubscription() {
  const queryClient = useQueryClient();

  const { mutate: subscribActions, isPending } = useMutation({
    mutationFn: manageSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { subscribActions, isPending };
}

// export function useSubscrib() {
//   const queryClient = useQueryClient();

//   const { mutate: subscrib, isPending } = useMutation({
//     mutationFn: subscribApi,

//     onSuccess: () => {
//       toast.success("subscriped");
//       queryClient.invalidateQueries({
//         queryKey: ["subscriptions"],
//       });
//     },

//     onError: (err) => toast.error(err.message),
//   });

//   return { subscrib, isPending };
// }

// export function useUnsubscrib() {
//   const queryClient = useQueryClient();

//   const { mutate: unsubscrib, isPending } = useMutation({
//     mutationFn: unsubscribApi,

//     onSuccess: () => {
//       toast.success("unSubscrib");
//       queryClient.invalidateQueries({
//         queryKey: ["subscriptions"],
//       });
//     },

//     onError: (err) => toast.error(err.message),
//   });

//   return { unsubscrib, isPending };
// }
