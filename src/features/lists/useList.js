import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBookmark as addBookmarkApi,
  addLike as addLikeApi,
  createEditList,
  getAList,
  getBookmark,
  getLikes,
  getLists,
  getUserLists,
  removeBookmark as removeBookmarkApi,
  removeLike as removeLikeApi,
} from "../../services/ApiList";

export function useGetLists() {
  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["list"],
    queryFn: getLists,
  });

  return { isLoading, lists, error };
}

export function useCreateList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createList, isPending: isCreating } = useMutation({
    mutationFn: createEditList,
    onSuccess: (data) => {
      toast.success("List create successfully");
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
      navigate(`/explorer/list/${data.id}`);
    },
    onError: (err) => {
      // @ts-ignore
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

export function useCheckLike() {
  const {
    isLoading,
    data: likes,
    error,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikes,
  });

  return { isLoading, likes, error };
}

export function useAddLike() {
  const queryClient = useQueryClient();
  const { mutate: addLike, isPending: isLiking } = useMutation({
    mutationFn: addLikeApi,
    onSuccess: () => {
      toast.success("your like has counted succesfuly");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("ERROR.couden't add please refresh");
    },
  });

  return { addLike, isLiking };
}

export function useRemoveLike() {
  const queryClient = useQueryClient();

  const { mutate: removeLike, isPending: isRemoving } = useMutation({
    mutationFn: removeLikeApi,
    onSuccess: () => {
      toast.success("your like succesfully remove");
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("ERROR.couden't remove try again");
    },
  });

  return { isRemoving, removeLike };
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
  
  return {bookmarks, error, isLoading}
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
  
  return {bookmarks, error, isLoading}
}