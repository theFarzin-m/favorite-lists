import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorCode = styled.div`
  font-size: 20rem;
  letter-spacing: 4rem;
`;
const ErrorText = styled.div`
  font-size: 3rem;
  margin: -100px 0 20px 0;
`;
const BackBtn = styled.button`
  border: 1px solid var(--text-100);
  padding: 15px 45px;
  color: var(--text-100);
  background-image: linear-gradient(
    to right,
    var(--bg-100) 0%,
    var(--bg-200) 51%,
    var(--bg-100)
  );
  background-size: 200% auto;
  text-transform: uppercase;
  &:hover {
    background-position: right center;
    color: var(--text-100);
    text-decoration: none;
    border: 1px solid var(--text-100);
  }
`;

const HomeBtn = styled(Link)`
  background-image: linear-gradient(
    to right,
    var(--primary-100) 0%,
    var(--primary-200) 51%,
    var(--primary-100)
  );

  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.7s;
  background-size: 200% auto;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`;

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="custom-centerize vh-100 vw-100 flex-column bg-bg text-clear">
      <ErrorCode className="text-primary-clear">404</ErrorCode>
      <ErrorText className="text-clear">Page Not Found</ErrorText>
      <div className="custom-centerize flex-row">
        <HomeBtn to={"/"} className="btn text-dull ms-3">
          <i className="bi bi-house-door ms-2"></i>Home
        </HomeBtn>
        <BackBtn onClick={() => navigate(-1)} className="btn">
          <i className="bi bi-arrow-counterclockwise ms-2"></i>Go Back
        </BackBtn>
      </div>
    </div>
  );
}
