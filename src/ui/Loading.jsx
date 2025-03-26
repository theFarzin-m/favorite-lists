import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-100);
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
`;

const LoaderText = styled.div`
  font-size: calc(2rem + 1vw);
  margin-bottom: 20px;
  align-self: flex-start;
  word-wrap: nowrap;
  color: var(--text-100);
  font-weight: 600;
  &::after {
    content: ".";
    animation: dots 3s infinite;
  }

  @keyframes dots {
    0% {
      content: "";
    }
    30% {
      content: ".";
    }
    60% {
      content: "..";
    }
    90% {
      content: "...";
    }
    100% {
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
  background-color: var(--text-200);
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
        <LoaderText className="cinzel">Data Is Coming</LoaderText>
        <LoaderBar>
          <LoaderTruck></LoaderTruck>
        </LoaderBar>
      </Loader>
    </Container>
  );
}
