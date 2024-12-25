import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import EyeSlash from "../../ui/EyeSlash";
import ResetButton from "../../ui/ResetButton";

export default function ChangePassword() {
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
      <div className="h4 bg-focus text-clear"> Change Password </div>
      <form onSubmit={handleSubmit(handelAction, handelErrors)}>
        <FormRow label="New Password:" error={errors?.newPassword?.message}>
          <EyeSlash Show={showPassword} setShow={setShowPassword} />
          <input
            type={showPassword ? "text" : "password"}
            className="form-control rounded-0 rounded-start border-0 bg-bg"
            {...register("newPassword", {
              required: "for changing password you need fill this",
              minLength: {
                value: 8,
                message: "Password most be 8 charecter long",
              },
            })}
          />
        </FormRow>

        <FormRow label="Confirmation:" error={errors?.confirmation?.message}>
          <EyeSlash Show={showPassword} setShow={setShowPassword} />
          <input
            type={showPassword ? "text" : "password"}
            className="form-control rounded-0 rounded-start border-0 bg-bg"
            {...register("confirmation", {
              required: "for changing password you need fill this",
              validate: (value) =>
                value === getValues().newPassword || "Passwords need to match",
            })}
          />
        </FormRow>
        <div className="d-flex justify-content-end">
          <button className="btn bg-primary-clear text-dull ms-3">
            confirm
          </button>
          <ResetButton />
        </div>
      </form>
    </>
  );
}
