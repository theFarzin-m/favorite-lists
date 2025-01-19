import React, { useEffect, useState } from "react";
import supabase from "../services/supabase";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAuth } from "../features/authentication/useAuth";
import Avatar from "./Avatar";
import { addProfileId } from "../store/profile/profileSlice";

const SidebarStyle = styled.div`
  width: 200px;
  height: 100%;
  border-right: 1px solid var(--bg-300) !important;
`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState({});
  const { id, username, fullname, avatar } = profile;

  async function getCurrentProfile(userId) {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user", userId)
      .single();

    if (error) {
      console.log(error);
      throw new Error("coudn't get profile");
    }

    setProfile(data);

    dispatch(addProfileId(data.id));
  }

  useEffect(() => {
    if (!user) return;
    let userId = user.id;
    getCurrentProfile(userId);
  }, [isLoading, user]);

  if (isLoading) return;

  return (
    <SidebarStyle className="sidebar pb-3 d-flex justify-content-between align-items-center flex-column">
      <div className="d-flex justify-content-start align-items-center flex-column">
        <div className="custom-centerize flex-column">
        <NavLink to={`/profile/${id}`}>
          <Avatar width="60px" src={avatar} />
        </NavLink>
          <div>{username}</div>
          <div className="small text-secondary">{fullname}</div>
        </div>
        <ul className="list-unstyled my-4 px-2">
          <li className="mb-4">
            <NavLink to="/" className="custom-centerize justify-content-start">
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-speedometer2"></i>
              </div>
              <span className="me-3">Dashboard</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/explorer"
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-binoculars"></i>
              </div>
              <span className="me-3">Explorer</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to={`/create-list`}
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-plus-circle"></i>
              </div>
              <span className="me-3">Cerate List</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/subscriptions"
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-people"></i>
              </div>
              <span className="me-3">Subscriptions</span>
            </NavLink>
          </li>

          {/* <li className="mb-4">
            <NavLink
              to={`/profile/${id}`}
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-person"></i>
              </div>
              <span className="me-3">Profile</span>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </SidebarStyle>
  );
}
