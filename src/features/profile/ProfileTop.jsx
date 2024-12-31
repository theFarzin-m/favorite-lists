import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../authentication/useAuth";
import Avatar from "../../ui/Avatar";
import Loading from "../../ui/Loading";
import { useGetProfile } from "./useProfile";
import OwenedOperation from "./OwenedOperation";
import SubscriptionBtn from "./SubscriptionBtn";

const OperationProfile = styled.div`
  border: 2px solid var(--primary-100);

  & button:hover {
    color: var(--text-200);
  }
`;

export default function ProfileTop() {
  const { profileId } = useParams();
  const { user } = useAuth();
  const { data, isLoading } = useGetProfile(profileId);

  if (isLoading) return <Loading />;
  
  const userId = user.id;

  const {
    fullname,
    username,
    bio,
    subscriptions,
    subscribers,
    user: profileOwner,
    avatar,
  } = data;

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
        <OperationProfile className="custom-centerize mt-5 w-100 custom-rounded-md bg-primary-dull">
          {userId === profileOwner ? (
            <OwenedOperation data={data} />
          ) : (
            <SubscriptionBtn subscriber={data.id} />
          )}
        </OperationProfile>
      </div>
    </div>
  );
}
