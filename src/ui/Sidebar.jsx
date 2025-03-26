import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import { useGetProfile } from "../features/profile/useProfile";

const SidebarStyle = styled.div`
  width: 200px;
  height: 100%;
  border-left: 1px solid var(--bg-300) !important;

  @media screen and (max-width: 992px) {
    position: fixed;
    width: 100%;
    bottom: env(safe-area-inset-bottom, 0);
    height: 60px;
    border-left: none;
    border-top: 1px solid var(--bg-300) !important;
    background-color: var(--bg-100);
    z-index: 99;
  }
`;

export default function Sidebar() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { data: profile, isLoading } = useGetProfile(profileId);

  if (isLoading) return;

  const { id, username, fullname, avatar } = profile;

  return (
    <SidebarStyle className="sidebar pb-lg-3 p-1 px-2 px-lg-0 d-lg-flex justify-content-between  align-items-center align-items-lg-start w-100">
      <div className="d-flex justify-content-lg-end justify-content-between align-items-center flex-row flex-lg-column w-100">
        <div className="custom-centerize flex-column mb-lg-4">
          <NavLink to={`/profile/${id}`}>
            {window.innerWidth < 992 ? (
              <Avatar width="40px" src={avatar} />
            ) : (
              <Avatar width="60px" src={avatar} />
            )}
          </NavLink>
          <div className="d-none d-lg-block">{username}</div>
          <div className="small text-secondary d-none d-lg-block">
            {fullname}
          </div>
        </div>
        <ul className="list-unstyled my-0 px-2 d-flex d-lg-block justify-content-between w-75 w-lg-auto">
          <li className="mb-0 mb-lg-4">
            <NavLink
              to="/"
              className="custom-centerize justify-content-lg-end justify-content-center"
            >
              <span className="ms-3 d-none d-lg-inline">Dashboard</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-speedometer2"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-lg-4">
            <NavLink
              to="/explorer"
              className="custom-centerize justify-content-lg-end justify-content-center"
            >
              <span className="ms-3 d-none d-lg-inline">Explorer</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-binoculars"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-lg-4">
            <NavLink
              to={`/create-list`}
              className="custom-centerize justify-content-lg-end justify-content-center"
            >
              <span className="ms-3 d-none d-lg-inline">Cerate List</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-plus-circle"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-lg-4">
            <NavLink
              to="/subscriptions"
              className="custom-centerize justify-content-lg-end justify-content-center"
            >
              <span className="ms-3 d-none d-lg-inline">Subscriptions</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-people"></i>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </SidebarStyle>
  );
}
