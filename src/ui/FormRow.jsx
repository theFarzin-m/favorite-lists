import React from "react";
import styled from "styled-components";

const InputBox = styled.label`
  border: 1px solid var(--text-200);
  transition: all 0.5s;
  & input {
    color: var(--text-100);
    transition: all 0.3s;
  }

  &:has(input:focus),
  &:has(input:focus-visible) {
    border-radius: 0 !important;
  }
  & input:focus,
  & input:focus-visible {
    outline: none !important;
    box-shadow: none;
    background-color: var(--bg-100);
    color: var(--text-100);
    border-radius: 0 !important;
  }
`;
export default function FormRow({ label, children, isRequerd, error }) {
  return (
    <div className="mb-3">
      <div className="custom-centerize">
        <span
          className={`ms-2 text-clear text-nowrap ${
            isRequerd ? "custom-required" : ""
          }`}
        >
          {label}
        </span>
        <InputBox className="w-100 custom-centerize rounded">
          {children}
        </InputBox>
      </div>
      {error && <small className="text-danger me-3"> {error} </small>}
    </div>
  );
}
