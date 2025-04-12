import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  LoginApi,
  LogoutApi,
  getCurrentUser,
  signupApi,
  updateUserApi,
} from "../../services/ApiAuthentication";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("please confirm your email address to login");
      navigate(`/`);
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { singup, isLoading };
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),

    onSuccess: (user) => {
      toast.success("Welcome");
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthunticated: user?.role === "authenticated" };
}

export function useLogout() {
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => navigate("/login", { replace: true }),
  });

  return { logout, isLoading };
}

export function useUserUpdate() {
  const queryClient = useQueryClient();

  const { mutate: userUpdate, isLoading: isUpdating } = useMutation({
    // @ts-ignore
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("confirm changes email send to your email");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      // @ts-ignore
      toast.error(err.message);
    },
  });

  return { userUpdate, isUpdating };
}
