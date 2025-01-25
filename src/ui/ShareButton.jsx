import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";


const ShareButtonStyle = styled.span`
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    scale: 1.4;
  }
`

export default function ShareButton({ text, display }) {
  const location = useLocation();
  const url = `https://favorite-list.com${location.pathname}`;

  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${text}:${url}`, "_blank");
  };

  const handleTelegramShare = () => {
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
  };

  const handleTwitterShare = () => {
    window.open(`http://twitter.com/share?text=${text}&url=${url}`, "_blank");
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${text + " " + url}`,
      "_blank"
    );
  };

  const handleInstargramShare = () => {
    window.open(
      `instagram://sharesheet?text=${text + " " + url}`,
      "_blank"
    );
  };

  return (
    <>
      <ShareButtonStyle
        onClick={handleTelegramShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-telegram fs-2"></i>
      </ShareButtonStyle>
      <ShareButtonStyle
        onClick={handleWhatsAppShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-whatsapp fs-2"></i>
      </ShareButtonStyle>
      <ShareButtonStyle
        onClick={handleFacebookShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-facebook fs-2"></i>
      </ShareButtonStyle>
      <ShareButtonStyle
        onClick={handleTwitterShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-twitter fs-2"></i>
      </ShareButtonStyle>
      <ShareButtonStyle
        onClick={handleInstargramShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-instagram fs-2"></i>
      </ShareButtonStyle>
    </>
  );
}
