import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useLogin } from "./useAuth";

import EyeSlash from "../../ui/EyeSlash";
import toast from "react-hot-toast";

const InputBox = styled.div`
  border: 1px solid var(--text-200);
  transition: all 0.5s;
  background-color: var(--primary-100);
  color: var(--text-200) !important;

  & * {
    color: var(--text-200) !important;
  }
  & input {
    color: var(--text-200);
    transition: all 0.3s;
  }

  &:has(input:focus),
  &:has(input:focus-visible) {
    border-radius: 0 !important;
  }
  & input {
    background-color: var(--primary-100);
  }
  & input::placeholder {
    color: var(--text-200);
  }
  & input:focus,
  & input:focus-visible {
    outline: none !important;
    box-shadow: none;
    background-color: var(--primary-100);
    color: var(--text-100);
    border-radius: 0 !important;
  }
`;
export default function LoginForm({ flip }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("email and password most be enter");
      return;
    }

    login({ email, password });
  };

  return (
    <>
      <h2>Login</h2>
      <figcaption className="text-accent-clear">
        Login and show you favorites
      </figcaption>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-end">
          <label htmlFor="email-login" className="form-label">
            Email
          </label>
          <InputBox className="rounded">
            <input
              type="email"
              placeholder="example@example.com"
              id="email-login"
              className="form-control rounded border-0 bg-bg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputBox>
        </div>

        <div className="mb-3 text-end">
          <label htmlFor="password-login" className="form-label">
            Password
          </label>
          <InputBox className="w-100 custom-centerize rounded">
            <EyeSlash Show={showPassword} setShow={setShowPassword} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              id="password-login"
              className="form-control rounded border-0 bg-bg"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputBox>
        </div>

        <div className="d-flex justify-content-end mb-1">
          <button
            className="btn bg-primary-clear text-dull ms-3"
            disabled={isLoading}
          >
            confirm
          </button>
        </div>
      </form>
      <div className="position-relative botton-0">
        <span>Don&apos;t have accound</span>
        <span
          role="button"
          className="mx-2 text-info text-decoration-underline"
          onClick={() => flip(false)}
        >
          Signup
        </span>
      </div>
    </>
  );
}
