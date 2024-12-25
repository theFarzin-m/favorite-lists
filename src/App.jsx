import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./ui/ProtectedRoute";
import Applayout from "./ui/Applayout";

import Dashboard from "./pages/Dashboard";
import MyLists from "./pages/MyLists";
import Explorer from "./pages/Explorer";
import Subscriptions from "./pages/Subscriptions";
import Profile from "./pages/Profile";
import CreateList from "./pages/CreateListPage";
import Bookmarks from "./pages/Bookmarks";
import ListDetails from "./pages/ListDetails";
import Login from "./pages/Login";

// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const MyLists = lazy(() => import("./pages/MyLists"));
// const Explorer = lazy(() => import("./pages/Explorer"));
// const Subscriptions = lazy(() => import("./pages/Subscriptions"));
// const Profile = lazy(() => import("./pages/Profile"));
// const CreateList = lazy(() => import("./pages/CreateListPage"));
// const Bookmarks = lazy(() => import("./pages/Bookmarks"));
// const ListDetails = lazy(() => import("./pages/ListDetails"));
// const Login = lazy(() => import("./pages/Login"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Applayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="my-lists" element={<MyLists />} />
            <Route path="my-lists/create-list" element={<CreateList />} />
            <Route path="my-lists/create-list/:id" element={<CreateList />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="explorer/list/:id" element={<ListDetails />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="profile/subscriptions" element={<Subscriptions />} />
            <Route path="profile/bookmark" element={<Bookmarks />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--text-100)",
            color: "var(--bg-100)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
