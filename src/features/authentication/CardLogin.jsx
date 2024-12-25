import React, { lazy, useState } from "react";
import styled from "styled-components";

const LoginForm = lazy(() => import("./LoginForm"));
const SignupForm = lazy(() => import("./SignupForm"));

const Container = styled.div`
  background-image: url(/img/login-background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;

const Card = styled.div`
  width: 400px;
  height: 600px;
  perspective: 1000px;
  transition: all 0.8s;
  &.singup {
    height: 400px;
  }
`;

const CartInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.999s;

  &.singup {
    transform: rotateY(180deg);
  }
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: var(--primary-100);
  color: var(--text-200);
  border-radius: 10px;
  transform: rotateY(0deg);
`;
const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: var(--bg-100);
  color: var(--text-100);
  border-radius: 10px;
  transform: rotateY(180deg);
`;

export default function CardLogin() {
  const [singup, setSingup] = useState(false);
  return (
    <Container className="custom-centerize">
      <Card className={`${singup ? "singup" : ""}`}>
        <CartInner className={`${singup ? "singup" : ""}`}>
          <Front className="p-3 text-center">
            <SignupForm flip={setSingup} />
          </Front>
          <Back className="p-3 text-center">
            <LoginForm flip={setSingup} />
          </Back>
        </CartInner>
      </Card>
    </Container>
  );
}
