/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import ResetButton from "../../ui/ResetButton";
import EditUser from "../authentication/EditUser";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { useUpdateProfile } from "./useProfile";

const FileLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  & input {
    display: none;
  }
`;

export default function EditProfile({ editeData = {}, toggleEdit }) {
  const [avatar, setAvatar] = useState(null);

  const { id: editeId, ...editeValues } = editeData;
  const isEditeSession = Boolean(editeId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditeSession ? editeValues : {},
  });
  const { errors } = formState;

  const { updateProfile, isUpdating } = useUpdateProfile();

  const handelAction = (data) => {
    const newData = {
      fullname: data.fullname,
      username: data.username,
      bio: data.bio,
    };
    updateProfile({ id: editeId, newData, avatar });
  };

  const handelErrors = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="h3 mb-3">Edite Profile</div>
      <form onSubmit={handleSubmit(handelAction, handelErrors)}>
        <FileLabel className="mx-auto mb-4" htmlFor="avatar">
          <Avatar
            width="150px"
            src={avatar ? URL.createObjectURL(avatar) : editeData.avatar}
          />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FileLabel>

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

        <FormRow label="bio:" error={errors?.username?.bio}>
          <textarea
            className="form-control rounded border-0 bg-bg"
            {...register("bio")}
          />
        </FormRow>

        <div className="d-flex justify-content-end mb-3">
          <div className="btn text-info" onClick={() => toggleEdit(true)}>
            change Password and Email
          </div>

          <button className="btn bg-primary-clear text-dull ms-3">
            confirm
          </button>
        </div>
      </form>
    </>
  );
}
