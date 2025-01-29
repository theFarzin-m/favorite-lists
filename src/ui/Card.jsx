import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectMovie } from "../store/list/listSlice";

import ListAvatar from "./ListAvatar";
import ListItem from "./ListItem";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useDeleteList } from "../features/lists/useList";

const CardStyle = styled.div`
  max-width: 300px !important;
  min-width: 300px;

  @media screen and (max-width: 992px) {
    max-width: 100% !important;
  }
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
  overflow-x: hidden;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

export default function Card({ list }) {
  const [scrollUp, setScrollUp] = useState(false);
  const [scrollDown, setScrollDown] = useState(true);
  const { deleteList, isPending } = useDeleteList();
  const profileId = useSelector((s) => s.profile.profileId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: listId, belongTo, listName, imdbID } = list;

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
    <CardStyle className="card bg-focus text-clear p-0 mx-md-auto">
      <div className="card-header d-flex justify-content-between align-items-center bg-focus">
        <Link to={`/explorer/list/${listId}`} className="custom-centerize">
          <ListAvatar
            width="30px"
            src={belongTo.avatar}
            alt={`${belongTo.username} avatar`}
          />
          <span className="mx-2">{listName}</span>
        </Link>
        {belongTo.id === profileId && (
          <div>
            <Modal>
              <Modal.open opens={listId}>
                <button className="btn">
                  <i className="bi bi-trash text-clear"></i>
                </button>
              </Modal.open>
              <Modal.window name={listId}>
                <ConfirmDelete
                  onConfirm={() => deleteList(listId)}
                  disabled={isPending}
                  resourceName={listName}
                />
              </Modal.window>
            </Modal>

            <button
              className="btn"
              onClick={() => navigate(`/create-list/${listId}`)}
            >
              <i className="bi bi-pencil-square text-clear"></i>
            </button>
          </div>
        )}
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

        {imdbID.map((id) => (
          <ListItem
            key={id}
            item={id}
            onClick={() => {
              dispatch(selectMovie(id));
              navigate(`/explorer/list/${listId}`);
            }}
          />
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
