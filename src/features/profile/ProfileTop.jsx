import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../authentication/useAuth";

import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Avatar from "../../ui/Avatar";
import Loading from "../../ui/Loading";
import { useGetProfile } from "./useProfile";

const OperationProfile = styled.div`
  border: 2px solid var(--primary-100);

  & button:hover {
    color: var(--text-200);
  }
`;

const test = {
  fullname: "1",
  username: "",
  bio: "",
  subscriptions: "",
  subscribers: "",
};

export default function ProfileTop() {
  const { profileId } = useParams();
  const { user } = useAuth();
  const { data, isLoading } = useGetProfile(profileId);
  const userId = user.id;

  if (isLoading) return <Loading />;
  const { fullname, username, bio, subscriptions, subscribers, user: profileOwner, avatar } = data;

  return (
    <div className="d-flex align-items-start justify-content-between">
      <div className="custom-centerize flex-column">
        <Avatar width="200px" src={avatar} />
        <span className="fs-3">{username}</span>
        <small className="text-secondary">{fullname}</small>
        <div className="fs-5">{bio}</div>
      </div>
      <div className="w-100">
        <div className="d-flex justify-content-evenly align-items-center mt-4 w-100">
          <div className="custom-centerize flex-column fs-1">
            <div>24</div>
            <div>Lists</div>
          </div>
          <Link
            to="/profile/subscriptions"
            className="custom-centerize flex-column fs-1"
          >
            <div>{subscriptions}</div>
            <div>Subscriptions</div>
          </Link>
          <div className="custom-centerize flex-column fs-1">
            <div>{subscribers}</div>
            <div>Subscribers</div>
          </div>
        </div>
        {userId === profileOwner ? (
          <>
            <OperationProfile className="custom-centerize mt-5 w-100 custom-rounded-md bg-primary-dull">
              <button
                className="btn bg-focus w-50 custom-rounded-md rounded-start-0 text-clear"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#edit-profile"
                aria-controls="edit-profile"
              >
                <i className="bi bi-pencil-square ms-2"></i>Edite
              </button>
              <div
                className="modal fade px-3 "
                tabIndex="-1"
                aria-labelledby="offcanvasExampleLabel"
                id="edit-profile"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header bg-bg">
                      <button
                        type="button"
                        className="btn p-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="bi bi-x-lg text-clear"></i>
                      </button>
                    </div>
                    <div className="modal-body bg-bg">
                      <EditProfile />
                      <ChangePassword />
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/profile/bookmark"
                className="btn bg-focus w-50 rounded-0 text-clear mx-1"
              >
                <i className="bi bi-box-bookmark ms-2"></i>Bookmarks
              </Link>
              <button className="btn bg-focus w-50 custom-rounded-md rounded-end-0 text-clear">
                <i className="bi bi-box-arrow-right ms-2"></i>Logout
              </button>
            </OperationProfile>
          </>
        ) : (
          <OperationProfile className="custom-centerize mt-5 w-100 custom-rounded-md bg-primary-dull">
            <button className="btn bg-focus w-100 custom-rounded-md ms-0 text-clear">
              <i className="bi bi-person-plus ms-2"></i>Subscrib
            </button>
          </OperationProfile>
        )}
      </div>
    </div>
  );
}
