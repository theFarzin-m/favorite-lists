import React from "react";
import styled from "styled-components";
import TooltipComponent from "./TooltipComponent";

const Line = styled.div`
  position: absolute;
  z-index: 10;
  background-color: var(--text-100);
  transform: rotate(30deg) translate(-9px, -12px);
  box-shadow: 0 0 0 2px var(--bg-100);
  height: 1px;
  width: 24px;
  &.eye {
    animation: noline 0.1s forwards;
  }
  &.eye-slash {
    display: block;
    animation: line 0.1s;
  }

  @keyframes line {
    0% {
      transform: rotate(0deg) translate(20px, -14px);
    }
    100% {
      transform: rotate(30deg) translate(-9px, -12px);
    }
  }

  @keyframes noline {
    0% {
      transform: rotate(30deg) translate(-9px, -12px);
    }
    100% {
      transform: rotate(0deg) translate(20px, -14px);
      display: none;
    }
  }
`;

export default function EyeSlash({Show, setShow}) {
  return (
    <TooltipComponent
      tooltipText={Show ? "Hide Password" : "Show Password"}
      placement="top"
    >
      <div
        className="form-label px-2 py-1 m-0 rounded-0 rounded-end"
        onClick={() => setShow((s) => !s)}
      >
        <i className="bi bi-eye fs-5 text-clear"></i>
        <Line className={Show ? "eye-slash" : "eye"}></Line>
      </div>
    </TooltipComponent>
  );
}
