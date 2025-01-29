import React from "react";
import styled from "styled-components";

const ErrorCode = styled.div`
  font-size: calc(5rem + 0.3vw);
`;
const ErrorText = styled.div`
  font-size: 2rem;
`;

export default function EmptySearch() {
  return (
    <div className="custom-centerize mt-4 flex-column bg-bg text-clear">
      <ErrorCode className="text-primary-clear">Noting found</ErrorCode>
      <ErrorText className="text-clear">
        Try Diffrent Words and Filter
      </ErrorText>
    </div>
  );
}
