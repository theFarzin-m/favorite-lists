import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function ShareButton({ text, display }) {
  const location = useLocation();
  const url = `https://sitename.com${location.pathname}`;

  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleTelegramShare = () => {
    window.open(
      `https://telegram.me/share/url?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`http://twitter.com/share?text=${text}&url=${url}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const handleInstargramShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <div
        onClick={handleTelegramShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-telegram fs-2"></i>
      </div>
      <div
        onClick={handleWhatsAppShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-whatsapp fs-2"></i>
      </div>
      <div
        onClick={handleLinkedInShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-linkedin fs-2"></i>
      </div>
      <div
        onClick={handleTwitterShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-twitter fs-2"></i>
      </div>
      <div
        onClick={handleInstargramShare}
        className={`${display ? "d-none" : ""}`}
      >
        <i className="bi bi-instagram fs-2"></i>
      </div>
    </>
  );
}
