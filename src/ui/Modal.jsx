/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--bg-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-drop);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--bg-200);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// @ts-ignore
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowsName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowsName) });
}

function Windows({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal
        // @ts-ignore
        ref={ref}
      >
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div> {cloneElement(children, { onCloseModal: close })} </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.open = Open;
Modal.window = Windows;

export default Modal;
