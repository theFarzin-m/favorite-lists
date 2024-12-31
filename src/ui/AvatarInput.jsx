import React from "react";

export default function AvatarInput() {
  return (
    <FormRow label={"Avatar"} error={errors?.avatar?.message}>
      <input
        type="file"
        className="form-control rounded border-0 bg-bg"
        {...register("email")}
      />
    </FormRow>
  );
}
