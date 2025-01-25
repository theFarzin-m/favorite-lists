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

const ImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
`;

export default function ListItem({
  item,
  handelDelete,
  onClick = null,
  isList = false,
}) {
  const { data, isPending } = useFetch(url + "i=" + item);

  return (
    <Item
      className="bg-focus text-clear w-100 my-2 placeholder-glow"
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
      {isPending ? (
        <>
          <div className="d-flex align-items-center">
            <ImagePlaceholder className="custom-rounded-sm placeholder" />
            <div className="mx-2 w-100">
              <div className="text-truncate placeholder w-75"></div>
              <br />
              <div className="small placeholder w-25"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <ListAvatar width="80px" src={data.Poster} />
            <div className="mx-2 w-50">
              <div className="text-truncate">{data.Title}</div>
              <div className="small">({data.Year})</div>
            </div>
          </div>
        </>
      )}
    </Item>
  );
}
