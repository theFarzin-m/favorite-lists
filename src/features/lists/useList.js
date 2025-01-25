import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  addBookmark as addBookmarkApi,
  createEditList,
  deleteListApi,
  getAList,
  getBookmark,
  getLists,
  getListsByProfileId,
  getUserLists,
  increaseViewApi,
  manageLikes,
  removeBookmark as removeBookmarkApi,
  searchedLists,
} from "../../services/ApiList";
import { useState } from "react";

export function useGetLists(order = "created_at") {
  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["list", order],
    queryFn: () => getLists(order),
  });

  return { isLoading, lists, error };
}

export function useSearchedLists() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "",
    asc = searchParams.get("asc") || false,
    sort = searchParams.get("sort") || "created_at",
    time = searchParams.get("time") || "0";

  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["list", q, asc, sort, time],
    queryFn: () => searchedLists(q, asc, sort, time),
  });

  return { isLoading, lists, error };
}

export function useGetListsByProfileId({ profileId }) {
  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["list", profileId],
    queryFn: () => getListsByProfileId(profileId),
  });

  return { isLoading, lists, error };
}

export function useCreateList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createList, isPending: isCreating } = useMutation({
    mutationFn: createEditList,
    onSuccess: (data) => {
      toast.success("List create or update successfully");
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
      navigate(`/explorer/list/${data.id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createList, isCreating };
}

export function useGetList() {
  const { id } = useParams();

  const {
    isLoading,
    data: list,
    error,
  } = useQuery({
    queryKey: ["list", id],
    queryFn: () => getAList(id),
  });

  return { isLoading, list, error };
}

export function useManageLikes() {
  const queryClient = useQueryClient();
  const { mutate: likesActions, isPending: isLiking } = useMutation({
    mutationFn: manageLikes,
    onSuccess: () => {
      toast.success("your like has counted succesfuly");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("error");
    },
  });

  return { likesActions, isLiking };
}

export function useAddBookmark() {
  const queryClient = useQueryClient();
  const { mutate: addBookmark, isPending } = useMutation({
    mutationFn: addBookmarkApi,
    onSuccess: () => {
      toast.success("list add to your bookmark");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("ERROR.couden't add please refresh");
    },
  });

  return { addBookmark, isPending };
}

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: removeBookmarkApi,
    onSuccess: () => {
      toast.success("list remove from bookmark");
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("ERROR.couden't remove try again");
    },
  });

  return { removeBookmark, isPending };
}

export function useGetBookmark() {
  const {
    isLoading,
    data: bookmarks,
    error,
  } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmark,
  });

  return { bookmarks, error, isLoading };
}

export function useGetUserLists(userId) {
  const {
    isLoading,
    data: bookmarks,
    error,
  } = useQuery({
    queryKey: ["list", userId],
    queryFn: () => getUserLists(userId),
  });

  return { bookmarks, error, isLoading };
}

export function useIncreaseView() {
  const { mutate: increaseView, isPending } = useMutation({
    mutationFn: increaseViewApi,
  });

  return { increaseView, isPending };
}

export function useDeleteList() {
  const queryClient = useQueryClient();

  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: deleteListApi,
    onSuccess: () => {
      toast.success("The list delete successfuly");
      queryClient.invalidateQueries({
        queryKey: ["list"],
      });
    },
    onError: () => toast.error("error accourding delete list"),
  });

  return { deleteList, isPending };
}
