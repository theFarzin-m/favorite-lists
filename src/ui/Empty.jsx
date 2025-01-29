import React from "react";
import styled from "styled-components";

const ErrorHearder = styled.div`
  font-size: calc(2rem + 0.3vw);
  filter: drop-shadow(0 2px 10px  var(--shadow-inset));
`;


export default function Empty() {
  return (
    <div className="custom-centerize mt-4 flex-column">
      <ErrorHearder className="text-clear">This is Empty</ErrorHearder>
    </div>
  );
}
