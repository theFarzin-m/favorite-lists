import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetListsByProfileId } from "../lists/useList";
import { useSelector } from "react-redux";
import SpinnerMini from "../../ui/SpinnerMini";

const CardTitle = styled.h5`
  border-bottom: 1px solid var(--text-200);
  margin-bottom: 35px;
`;
const CardText = styled.div`
  aspect-ratio: 4/1;
`;

export default function AllDetails() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { lists, isLoading } = useGetListsByProfileId({ profileId });
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const countRecivers = (data) => {
      data.map((list) => {
        setLikes((l) => l + list.likes);
        setViews((v) => v + list.views);
      });
    };

    if (lists) {
      countRecivers(lists);
    }
  }, [lists, isLoading]);

  return (
    <div className="card mb-3 px-3  custom-bg-primary-gradient w-100 text-dull custom-rounded-lg">
      <div className="card-body pb-0">
        <CardTitle className="card-title pb-3 fs-3">All you recive</CardTitle>
        <CardText className="card-text pb-2 d-flex justify-content-between align-items-end flex-nowrap flex-row">
          <div>
            <div className="fs-2">Likes</div>
            <div className="custom-centerize ms-3">
              <span>
                <i className="bi bi-suit-heart-fill ms-2 fs-1"></i>
              </span>
              <span className="fs-3">
                {isLoading ? <SpinnerMini /> : likes}
              </span>
            </div>
          </div>

          <div className="custom-centerize ms-3">
            <div>
              <div className="fs-2">Views</div>
              <span>
                <i className="bi bi-eye-fill fs-1 ms-2"></i>
              </span>
              <span className="fs-3">
                {isLoading ? <SpinnerMini /> : views}
              </span>
            </div>
          </div>

          <div className="custom-centerize">
            <div>
              <div className="fs-2">Lists</div>
              <span>
                <i className="bi bi-list ms-2 fs-1"></i>
              </span>
              <span className="fs-3">
                {isLoading ? <SpinnerMini /> : lists.length}
              </span>
            </div>
          </div>
        </CardText>
      </div>
    </div>
  );
}
