import React from "react";
import styled from "styled-components";
import ListAvatar from "./ListAvatar";
import { useFetch } from "../hooks/usefetch";
import { url } from "../assets/variables";
import SpinnerMini from "./SpinnerMini";

const Item = styled.div`
  width: 100%;
`;

export default function ListItem({ item, onClick = null }) {  
  const { data, isPending } = useFetch(url + "i=" + item);

  if (isPending) return <SpinnerMini />;
  return (
    <Item className="bg-focus text-clear d-flex align-items-center justify-content-start w-100 my-2" onClick={onClick}>
      <div className="d-flex align-items-center col-10">
        <ListAvatar width="100px" src={data.Poster} />
        <span className="me-2 text-truncate w-25">{data.Title}</span>
        <span>({data.Year})</span>
      </div>
      <div className="col-2">{data.Type}</div>
    </Item>
  );
}
