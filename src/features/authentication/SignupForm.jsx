import React, { useState } from "react";
import { useForm } from "react-hook-form";

import EyeSlash from "../../ui/EyeSlash";
import styled from "styled-components";
import { useSignup } from "./useAuth";

const InputBox = styled.div`
  border: 1px solid var(--text-200);
  transition: all 0.5s;
  background-color: var(--bg-100);
  & input {
    color: var(--text-100);
    transition: all 0.3s;
  }

  &:has(input:focus),
  &:has(input:focus-visible) {
    border-radius: 0 !important;
  }

  & input:focus,
  & input:focus-visible {
    outline: none !important;
    box-shadow: none;
    background-color: var(--bg-100);
    color: var(--text-100);
    border-radius: 0 !important;
  }
`;

const ErrorText = styled.p`
  font-size: 0.8rem;
  height: 0.8rem;
  & > Span {
    color: red;
    background-color: var(--bg-100);
  }
`;

export default function SignupForm({ flip }) {
  const { register, reset, handleSubmit, formState, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { singup, isLoading } = useSignup();

  const { errors } = formState;

  const handelAction = (data) => {
    const email = data.email;
    const password = data.password;
    const fullname = data.fullname;
    const username = data.username;
    singup({email, password, username , fullname});
  };

  const handelErrors = (err) => {
    console.log(err);
  };

  return (
    <>
      <h2>Signup</h2>
      <figcaption className="text-accent-clear">
        Signup and Create your list to tell Everyone your favorits
      </figcaption>
      <form onSubmit={handleSubmit(handelAction, handelErrors)}>
        <div className="mb-2 text-end">
          <label htmlFor="email" className="form-label mb-1">
            Email
          </label>
          <InputBox className="rounded">
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              className="form-control rounded border-0 bg-bg"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "invalide email",
                },
              })}
            />
          </InputBox>
          <ErrorText>
            <span>{errors?.email?.message}</span>
          </ErrorText>
        </div>

        <div className="custom-centerize">
          <div className="mb-2 ms-1 text-end">
            <label htmlFor="fullname" className="form-label mb-1">
              Fullname
            </label>
            <InputBox className="rounded">
              <input
                type="text"
                placeholder="Firstname Lastname"
                id="fullname"
                className="form-control rounded border-0 bg-bg"
                {...register("fullname", {
                  required: "This field is required",
                })}
              />
            </InputBox>
            <ErrorText>
              <span>{errors?.fullname?.message}</span>
            </ErrorText>
          </div>

          <div className="mb-2 text-end">
            <label htmlFor="username" className="form-label mb-1">
              Username
            </label>
            <InputBox className="rounded">
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="form-control rounded border-0 bg-bg"
                {...register("username", {
                  required: "This field is required",
                })}
              />
            </InputBox>
            <ErrorText>
              <span>{errors?.username?.message}</span>
            </ErrorText>
          </div>
        </div>

        <div className="mb-2 text-end">
          <label htmlFor="password" className="form-label mb-1">
            Password
          </label>
          <InputBox className="w-100 custom-centerize rounded">
            <EyeSlash Show={showPassword} setShow={setShowPassword} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              id="password"
              className="form-control rounded border-0 bg-bg"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password most be 8 charecter long",
                },
              })}
            />
          </InputBox>
          <ErrorText>
            <span>{errors?.password?.message}</span>
          </ErrorText>
        </div>

        <div className="mb-3 text-end">
          <label htmlFor="confirmation" className="form-label mb-1">
            Confirmation
          </label>
          <InputBox className="w-100 custom-centerize rounded">
            <EyeSlash Show={showPassword} setShow={setShowPassword} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              id="confirmation"
              className="form-control rounded border-0 bg-bg"
              {...register("confirmation", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </InputBox>
          <ErrorText>
            <span>{errors?.confirmation?.message}</span>
          </ErrorText>
        </div>

        <div className="d-flex justify-content-end mb-1">
          <button
            className="btn bg-bg text-primary-clear ms-3"
            disabled={isLoading}
          >
            confirm
          </button>
        </div>
      </form>
      <div>
        <span>already have acccount</span>
        <span
          role="button"
          className="mx-2 text-info text-decoration-underline"
          onClick={() => flip(true)}
        >
          Login
        </span>
      </div>
    </>
  );
}
