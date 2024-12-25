import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
`;

const LoaderText = styled.div`
  font-size: 50px;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  align-self: center;
  &::after {
    content: ".";
    animation: dots 3s infinite;
  }

  @keyframes dots {
    0%{
      content: "";
    }    
    30%{
      content: ".";
    } 
    60%{
      content: "..";
    } 
    90%{
      content: "...";
    } 
    100%{
      content: "...";
    } 
  }
`;

const LoaderBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  background-image: linear-gradient(
    to right,
    var(--primary-100),
    var(--primary-200)
  );
  width: 100%;
  height: 10px;
`;

const LoaderTruck = styled.div`
  width: 30%;
  height: 10px;
  border-radius: 5px;
  background-color: var(--text-100);
  animation: loader-bar-animation 3s ease-in-out infinite;

  @keyframes loader-bar-animation {
    0% {
      /* transform: translateX(-100%) rotate(270deg); */
      transform: translateX(-100%);
    }

    50% {
      /* transform: translateX(100%) rotate(-90deg); */
      transform: translateX(100%);
    }

    100% {
      /* transform: translateX(-100%) rotate(270deg); */
      transform: translateX(-100%);
    }
  }
`;

export default function Loading() {
  return (
    <Container className="custom-centerize bg-bg text-clear">
      <Loader>
        <LoaderText>Loading</LoaderText>
        <LoaderBar>
          <LoaderTruck></LoaderTruck>
        </LoaderBar>
      </Loader>
    </Container>
  );
}
