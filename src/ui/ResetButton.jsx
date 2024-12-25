import React from "react";
import styled from "styled-components";

const ResetBtn = styled.button`
  border: 1px solid var(--primary-100);

  &:hover {
    border: 1px solid var(--primary-100);
    border-radius: 0 !important;
  }
`;

export default function ResetButton() {
  return (
    <ResetBtn type="reset" className="btn text-clear">
      Reset
    </ResetBtn>
  );
}
