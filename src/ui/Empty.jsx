import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: ${(props) => props.$size === "large" ? "calc(5rem + 0.3vw)" : props.$size === "medium" ? "calc(3rem + 0.3vw)" : "calc(1rem + 0.3vw)" };
`;
const SubTitle = styled.div`
  font-size: ${(props) => props.$size === "large" ? "calc(2rem + 0.3vw)" : props.$size === "medium" ? "calc(1.5rem + 0.3vw)" : "calc(1rem + 0.3vw)" };;
`;

export default function Empty({ title, subTitle, size = "large" }) {
  return (
    <div className="custom-centerize mt-4 flex-column text-clear">
      <Title className="text-primary-clear" $size={size}>
        {title}
      </Title>
      <SubTitle className="text-clear">{subTitle}</SubTitle>
    </div>
  );
}
