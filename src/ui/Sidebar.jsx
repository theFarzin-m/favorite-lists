import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Avatar from "./Avatar";

const SidebarStyle = styled.div`
  width: 200px;
  height: 100%;
  border-right: 1px solid var(--bg-300) !important;
`;

export default function Sidebar() {
  return (
    <SidebarStyle className="sidebar pb-3 d-flex justify-content-between align-items-center flex-column">
      <div className="d-flex justify-content-start align-items-center flex-column">
        <div className="custom-centerize flex-column">
          <Avatar width="60px" />
          <div>usename</div>
          <div className="small text-secondary">firstname lastname</div>
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
              to="/my-lists"
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-list-nested"></i>
              </div>
              <span className="me-3">My lists</span>
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
              to="/profile/1"
              className="custom-centerize justify-content-start text-none"
            >
              <div className="bg-focus icon-wrapper custom-centerize">
                <i className="bi bi-person"></i>
              </div>
              <span className="me-3">Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </SidebarStyle>
  );
}
