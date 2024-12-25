// eslint-disable-next-line no-unused-vars
import React, { startTransition, useEffect } from "react";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // load user
  const { isLoading, isAuthunticated, user } = useAuth();

  // redirect not authunticated user to log in
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthunticated && !user) navigate("/login");
  }, [isAuthunticated, isLoading, user]);

  // loading spinner
  if (isLoading) return <Loading />;

    // return app
    return children;
}
