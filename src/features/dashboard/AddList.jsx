import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  min-height: 130px;
  max-width: ${(props) => (props.$inRow ? "300px" : "none")};
`;

export default function AddList({ inRow }) {
  return (
    <Box
      className={`card custom-bg-primary-gradient custom-rounded-lg text-dull mt-4 border-0 ${
        inRow ? "mx-4" : ""
      }`}
      $inRow={inRow}
    >
      <div className="card-body">
        <h5 className="card-title mb-0">Add New List</h5>
        <Link className="custom-centerize h-100" to="/my-lists/create-list">
          <button className="btn text-clear text-dull">
            <i className="bi bi-plus-lg fs-1 text-dull"></i>
          </button>
        </Link>
      </div>
    </Box>
  );
}
