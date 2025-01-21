import React from "react";

import styled from "styled-components";

const ProfileImg = styled.div`
  overflow: hidden;
  & img {
    object-fit: cover;
  }
  max-width: ${(props) => props.$size};
  max-height: ${(props) => props.$size};
`;

export default function ListAvatar({ width, src, alt }) {
  return (
    <ProfileImg
      $size={width}
      className="d-flex justify-content-center align-items-center custom-rounded-sm"
    >
      <img
        src={src ? src : "/img/default-avatar.jpg"}
        alt={alt ? alt : "avatar image"}
        className="overflow-hidden"
        width="111%"
        height="111%"
      />
    </ProfileImg>
  );
}
