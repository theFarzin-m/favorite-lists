import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import ListAvatar from "./ListAvatar";
import Menus from "./Menus";
import TooltipComponent from "./TooltipComponent";
import SpinnerMini from "./SpinnerMini";
import { useFetch } from "../hooks/usefetch";
import { url } from "../assets/variables";
import ListItem from "./ListItem";

const CardStyle = styled.div`
  max-width: 300px !important;
`;
const ScrollArrow = styled.div`
  left: 45%;
  animation: up-down 1s infinite alternate;
  &:last-of-type {
    bottom: 0;
  }

  @keyframes up-down {
    0% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(-3px);
    }
  }
`;
const CardBody = styled.div`
  height: 300px;
  overflow-y: auto;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

export default function Card({ list }) {
  const [scrollUp, setScrollUp] = useState(false);
  const [scrollDown, setScrollDown] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const navigate = useNavigate();

  const handelScroll = (e) => {
    if (e.target.scrollTop == 0) {
      setScrollUp(false);
    } else {
      setScrollUp(true);
    }
    if (e.target.scrollTop + 300 >= e.target.scrollHeight) {
      setScrollDown(false);
    } else {
      setScrollDown(true);
    }
  };

  return (
    <CardStyle className="card bg-focus text-clear p-0 mx-4">
      <div className="card-header d-flex justify-content-between align-items-center bg-focus">
        <Link to={`/explorer/list/${list.id}`} className="custom-centerize">
          {/* <ListAvatar width="30px" /> */}
          <span className="mx-2">{list.listName}</span>
        </Link>
        <div className="d-flex">
          <TooltipComponent tooltipText="like 24k" placement="top">
            <span
              className="custom-centerize flex-column mx-2"
              onClick={() => setIsLiked((like) => !like)}
            >
              {isLiked ? (
                <i className="bi bi-suit-heart-fill text-danger"></i>
              ) : (
                <i className="bi bi-suit-heart"></i>
              )}
            </span>
          </TooltipComponent>
          <TooltipComponent tooltipText="Bookmark" placement="top">
            <span
              className="custom-centerize flex-column mx-2"
              onClick={() => setBookmark((b) => !b)}
            >
              {bookmark ? (
                <i className="bi bi-bookmark-fill text-info"></i>
              ) : (
                <i className="bi bi-bookmark"></i>
              )}
            </span>
          </TooltipComponent>
        </div>

        <Menus>
          <Menus.toggle toggleId="listId" />
          <Menus.list listId="listId">
            <Menus.button
              icon={<i className="bi bi-pencil-square text-clear"></i>}
              onClick={() => navigate("/my-lists/create-list/:1")}
            >
              Edite List
            </Menus.button>
            <Menus.button icon={<i className="bi bi-trash text-clear"></i>}>
              Delete
            </Menus.button>
          </Menus.list>
        </Menus>
      </div>
      <CardBody
        className="list-group p-2 list-group-flush bg-bg"
        onScroll={handelScroll}
      >
        <ScrollArrow
          className={`position-absolute z-3 text-clear ${
            scrollUp ? "" : "d-none"
          }`}
        >
          <i className="bi bi-chevron-double-up"></i>
        </ScrollArrow>

        {list.imdbID.map((id) => (
          <ListItem key={id} item={id} />
        ))}

        <ScrollArrow
          className={`position-absolute z-3 text-clear ${
            scrollDown ? "" : "d-none"
          }`}
        >
          <i className="bi bi-chevron-double-down"></i>
        </ScrollArrow>
      </CardBody>
    </CardStyle>
  );
}
