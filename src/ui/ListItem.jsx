/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ListAvatar from "./ListAvatar";
import { useFetch } from "../hooks/usefetch";
import { url } from "../assets/variables";
import SpinnerMini from "./SpinnerMini";

const Item = styled.div`
  width: 100%;
`;

export default function ListItem({
  item,
  handelDelete,
  onClick = null,
  isList = false,
}) {
  const { data, isPending } = useFetch(url + "i=" + item);
  if (isPending) return <SpinnerMini />;
  return (
    <Item
      className="bg-focus text-clear d-flex align-items-center justify-content-start w-100 my-2"
      onClick={onClick}
    >
      {isList && (
        <button
          className="btn position-absolute z-2 m-1 px-1 py-0 start-0 top-0"
          onClick={() => handelDelete(item)}
        >
          <i className="bi bi-trash"></i>
        </button>
      )}
      <div className="d-flex align-items-center col">
        <ListAvatar width="80px" src={data.Poster} />
        <span className="me-2 text-truncate" >{data.Title}</span>
      </div>
        <div className="mx-2 col-4">({data.Year})</div>
    </Item>
  );
}
