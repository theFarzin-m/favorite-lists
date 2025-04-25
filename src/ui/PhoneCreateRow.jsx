import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ListAvatar from "./ListAvatar";
import { useFetch } from "../hooks/usefetch";
import { url } from "../assets/variables";
import { is } from "date-fns/locale";

const Selected = styled.button`
  border: 1px solid var(--primary-100);
  width: 20px;
  height: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.$isChecked ? "var(--primary-100)" : "inherits"};
`;

const DeleteBtn = styled.div`
  height: 20px !important;
  width: 20px !important;
  background-color: var(--primary-100);
  display: flex;
  justify-content: center;
  align-items: center;
  top: -5px;
  right: -5px;
`;

export default function PhoneCreateRow({
  isList,
  isChecked = false,
  item,
  handelDelete,
  handelMoving,
  handelAdd,
  isFirst,
  isLast,
  isViewing = false,
}) {
  const { data, isPending } = useFetch(url + "i=" + item);
  if (!isPending && !data) {
    return;
  }

  return (
    <div
      className="card p-0 border-0 bg-bg mx-2 placeholder-glow"
      style={{ width: "120px" }}
    >
      {isPending ? (
        <ListAvatar width="120px" className="card-img-top placeholder" />
      ) : (
        <ListAvatar width="120px" className="card-img-top" src={data.Poster} />
      )}
      <div className="card-body">
        <div className="card-title fs-6 text-center text-clear">
          {isPending ? (
            <>
              <div className="placeholder"></div>
              <small className="placeholder">2000 - 2000</small>
            </>
          ) : (
            <>
              <div className="text-truncate">{data.Title}</div>
              <small>({data.Year})</small>
            </>
          )}
        </div>
        {!isViewing && isList ? (
          <>
            <div className="custom-centerize fs-5">
              <button
                className="btn bg-primary-clear text-dull rounded-0 rounded-end py-1 px-2"
                onClick={() => handelMoving(item, true)}
                disabled={isFirst}
              >
                <i className="bi bi-arrow-left" />
              </button>
              <button
                className="btn bg-primary-clear text-dull rounded-0 rounded-start py-1 px-2"
                onClick={() => handelMoving(item, false)}
                disabled={isLast}
              >
                <i className="bi bi-arrow-right" />
              </button>
            </div>
            <DeleteBtn className="text-dull rounded-circle position-absolute">
              <button
                className="btn p-0 m-0"
                onClick={() => handelDelete(item)}
              >
                <i className="bi bi-x text-dull" />
              </button>
            </DeleteBtn>
          </>
        ) : (
          <div className="custom-centerize">
            <Selected
              $isChecked={isChecked}
              disabled={isChecked}
              onClick={() => handelAdd(item)}
            >
              {isChecked && <i className="bi bi-check-lg text-dull fs-5" />}
            </Selected>
          </div>
        )}
      </div>
    </div>
  );
}
