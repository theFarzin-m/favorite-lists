import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  background-color: var(--bg-200);
  transition: all 0.5s;
  color: var(--text-100);
  &::placeholder {
    color: var(--text-100);
  }

  &:focus,
  &:focus-visible {
    outline: none !important;
    box-shadow: none;
    background-color: var(--bg-200);
    border-radius: 0 !important;
    color: var(--text-100);
  }
`;

const SearchBoxStyle = styled.div`
  min-width: 230px;
  border: 1px solid var(--primary-100);
  background-color: var(--bg-200);
  transition: all 0.5s;
  &:has(input:focus),
  &:has(input:focus-visible) {
    border-radius: 0 !important;
  }
`;

export default function SearchBox({ size, query, setQuery }) {
  return (
    <SearchBoxStyle className="col ms-3 custom-centerize custom-rounded-md">
      <span className="custom-centerize p-2">
        <i className="bi bi-search"></i>
      </span>
      <SearchInput
        className={`form-control form-control-${size} text-dull border-0 w-100 custom-rounded-md`}
        type="text"
        placeholder="Search..."
        aria-label=".form-control-lg example"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </SearchBoxStyle>
  );
}
