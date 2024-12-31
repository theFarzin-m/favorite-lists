import React from "react";

import styled from "styled-components";

const ProfileImg = styled.div`
  overflow: hidden;
  & img {
    object-fit: cover;
  }
  max-width: ${(props) => props.$size};
  max-height: ${(props) => props.$size};
  aspect-ratio: 1/1;
`;

export default function Avatar({ width, src }) {
  return (
    <ProfileImg
      $size={width}
      className="d-flex justify-content-center align-items-center rounded-circle"
    >
      <img
        src={src ? src : "/img/default-avatar.jpg"}
        alt="profile image"
        className="overflow-hidden"
        width="111%"
        height="111%"
      />
    </ProfileImg>
  );
}
