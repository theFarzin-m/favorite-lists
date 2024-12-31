import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import EyeSlash from "../../ui/EyeSlash";
import ResetButton from "../../ui/ResetButton";
import { useAuth, useUserUpdate } from "./useAuth";

export default function EditUser({ toggleEdit }) {
  const { user } = useAuth();

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: { email: user.email },
  });

  const { isUpdating, userUpdate } = useUserUpdate();

  const [showPassword, setShowPassword] = useState(false);

  const { errors } = formState;

  const handelAction = (data) => {
    userUpdate({ email: data.email, password: data.password });
  };

  const handelErrors = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="h4 bg-focus text-clear"> Change Password </div>
      <form onSubmit={handleSubmit(handelAction, handelErrors)}>
        <FormRow label="Email:" error={errors?.email?.message} isRequerd={true}>
          <EyeSlash Show={showPassword} setShow={setShowPassword} />
          <input
            type="email"
            className="form-control rounded-0 rounded-start border-0 bg-bg"
            {...register("email", {
              required: "for changing password you need fill this",
            })}
          />
        </FormRow>

        <FormRow label="New Password:" error={errors?.newPassword?.message}>
          <EyeSlash Show={showPassword} setShow={setShowPassword} />
          <input
            type={showPassword ? "text" : "password"}
            className="form-control rounded-0 rounded-start border-0 bg-bg"
            {...register("newPassword", {
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
              validate: (value) =>
                value === getValues().newPassword || "Passwords need to match",
            })}
          />
        </FormRow>
        <div className="d-flex justify-content-end mb-3">
          <div className="btn text-info" onClick={() => toggleEdit(false)}>
            Edite profile
          </div>

          <button
            className="btn bg-primary-clear text-dull ms-3"
            disabled={isUpdating}
          >
            confirm
          </button>
          <ResetButton onClick={reset} />
        </div>
      </form>
    </>
  );
}
