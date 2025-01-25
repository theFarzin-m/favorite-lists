/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import TooltipComponent from "../../ui/TooltipComponent";
import ShareButton from "../../ui/ShareButton";
import LikeOparation from "./LikeOparation";
import BookmarkOparation from "./BookmarkOparation";
import { useNavigate } from "react-router-dom";

const ListOparation = styled.div`
  width: 100%;
  transition: all 0.7s;
  justify-content: space-between !important;
`;

export default function Operations({ setSharing, sharing, likesCount, views }) {
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();

  const handelswitchshare = () => {
    setSharing((s) => !s);
    setTimeout(() => setDisplay(!display), 200);
  };

  return (
    <ListOparation className="bg-focus text-clear custom-centerize py-2 px-4 mx-auto mb-3 rounded-pill">
      <TooltipComponent tooltipText="Back" placement="top">
        <span
          className={`custom-centerize flex-column ${display ? "" : "d-none"}`}
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left fs-2"></i>
        </span>
      </TooltipComponent>

      <LikeOparation likesCount={likesCount} display={display} />
      <BookmarkOparation display={display} />

      <TooltipComponent tooltipText={`Views ${views}`} placement="top">
        <span
          className={`custom-centerize flex-column ${display ? "" : "d-none"}`}
        >
          <i className="bi bi-eye fs-2"></i>
        </span>
      </TooltipComponent>

      <ShareButton text="check this list out!" display={display} />

      {sharing ? (
        <span
          className="custom-centerize flex-column"
          onClick={handelswitchshare}
        >
          <i className="bi bi-x-lg fs-4"></i>
        </span>
      ) : (
        <TooltipComponent tooltipText="Share" placement="top">
          <span
            className="custom-centerize flex-column"
            onClick={handelswitchshare}
          >
            <i className="bi bi-share fs-4"></i>
          </span>
        </TooltipComponent>
      )}
    </ListOparation>
  );
}
