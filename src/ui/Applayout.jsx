import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import supabase from "../services/supabase";

import { addProfileId } from "../store/profile/profileSlice";

import { useAuth } from "../features/authentication/useAuth";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import styled from "styled-components";

const ApplayoutStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr auto;
  height: 100%;

  @media screen and (max-width: 992px) {
    grid-template-rows: 1fr 50px;
    grid-template-columns: 1fr;
  }
`;

export default function Applayout() {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();

  async function getCurrentProfile(userId) {
    const { data, error } = await supabase
      .from("profile")
      .select("id")
      .eq("user", userId)
      .single();

    if (error) {
      console.log(error);
      throw new Error("coudn't get profile");
    }

    await dispatch(addProfileId(data.id));
  }

  useEffect(() => {
    if (!user) return;
    let userId = user.id;
    getCurrentProfile(userId);
  }, [isLoading, user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <ApplayoutStyle className="pt-4">
        <main className="px-lg-4 px-md-3 px-2 mb-4 mb-lg-0">
          <Outlet />
        </main>
        <div className="">
          <Sidebar />
        </div>
      </ApplayoutStyle>
    </>
  );
}
