import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import { useGetProfile } from "../features/profile/useProfile";

const SidebarStyle = styled.div`
  width: 200px;
  height: 100%;
  border-left: 1px solid var(--bg-300) !important;

  @media screen and (max-width: 768px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 50px;
    border-left: none;
    border-top: 1px solid var(--bg-300) !important;
    background-color: var(--bg-100);
  }
`;

export default function Sidebar() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { data: profile, isLoading } = useGetProfile(profileId);

  if (isLoading) return;

  const { id, username, fullname, avatar } = profile;

  return (
    <SidebarStyle className="sidebar pb-md-3 p-1 d-flex justify-content-between align-items-center w-100">
      <div className="d-flex justify-content-md-end justify-content-between align-items-center flex-row flex-md-column w-100">
        <div className="custom-centerize flex-column">
          <NavLink to={`/profile/${id}`}>
          {window.innerWidth < 768 ? 
            <Avatar width="40px" src={avatar} />
          :
            <Avatar width="60px" src={avatar} />
          }
          </NavLink>
          <div className="d-none d-md-block">{username}</div>
          <div className="small text-secondary d-none d-md-block">
            {fullname}
          </div>
        </div>
        <ul className="list-unstyled my-4 px-2 d-flex d-md-block justify-content-between w-75 w-md-auto">
          <li className="mb-0 mb-md-4">
            <NavLink to="/" className="custom-centerize justify-content-md-end justify-content-center">
              <span className="ms-3 d-none d-md-inline">Dashboard</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-speedometer2"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-md-4">
            <NavLink
              to="/explorer"
              className="custom-centerize justify-content-md-end justify-content-center"
            >
              <span className="ms-3 d-none d-md-inline">Explorer</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-binoculars"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-md-4">
            <NavLink
              to={`/create-list`}
              className="custom-centerize justify-content-md-end justify-content-center"
            >
              <span className="ms-3 d-none d-md-inline">Cerate List</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-plus-circle"></i>
              </div>
            </NavLink>
          </li>

          <li className="mb-0 mb-md-4">
            <NavLink
              to="/subscriptions"
              className="custom-centerize justify-content-md-end justify-content-center"
            >
              <span className="ms-3 d-none d-md-inline">Subscriptions</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-people"></i>
              </div>
            </NavLink>
          </li>

          {/* <li className="mb-0 mb-md-4">
            <NavLink
              to={`/profile/${id}`}
              className="custom-centerize justify-content-start text-none"
            >
              <span className="me-3 d-none d-md-inline">Profile</span>
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-person"></i>
              </div>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </SidebarStyle>
  );
}
