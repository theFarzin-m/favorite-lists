import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import EyeSlash from "../../ui/EyeSlash";
import ResetButton from "../../ui/ResetButton";

export default function EditProfile() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { errors } = formState;

  const handelAction = (data) => {
    console.log(data);
    reset();
  };

  const handelErrors = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="h3 mb-3">Edite Profile</div>
      <form onSubmit={handleSubmit(handelAction, handelErrors)}>
        <FormRow
          label={"Email:"}
          isRequerd={true}
          error={errors?.email?.message}
        >
          <input
            type="email"
            className="form-control rounded border-0 bg-bg"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "invalide email",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Fullname:"
          isRequerd={true}
          error={errors?.fullname?.message}
        >
          <input
            type="text"
            className="form-control rounded border-0 bg-bg"
            {...register("fullname", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow
          label="Username:"
          isRequerd={true}
          error={errors?.username?.message}
        >
          <input
            type="text"
            className="form-control rounded border-0 bg-bg"
            {...register("username", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Username most be 6 charecter long",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Password:"
          isRequerd={true}
          error={errors?.password?.message}
        >
          <EyeSlash Show={showPassword} setShow={setShowPassword} />
          <input
            type={showPassword ? "text" : "password"}
            className="form-control rounded-0 rounded-start border-0 bg-bg"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password most be 8 charecter long",
              },
            })}
          />
        </FormRow>

        <div className="d-flex justify-content-end mb-3">
          <button className="btn bg-primary-clear text-dull ms-3">
            confirm
          </button>
          <ResetButton />
        </div>
      </form>
    </>
  );
}
