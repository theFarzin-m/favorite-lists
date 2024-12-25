import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.2rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  color: var(--text-100);

  &:hover {
    background-color: var(--bg-100);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  list-style: none;
  background-color: var(--bg-200);
  box-shadow: var(--shadow-inset);
  border-radius: var(--border-radius-md);
  padding: 0;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  transition: all 0.2s;
  color: var(--text-100);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  border: 1px solid rgba(var(--border-hover), 0);
  border-radius: var(--border-radius-md);

  &:hover {
    border: 1px solid rgba(var(--border-hover),0.3);
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ toggleId }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handeler(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== toggleId ? open(toggleId) : close();
  }

  return (
    <StyledToggle onClick={handeler}>
      <i className="bi bi-three-dots-vertical"></i>
    </StyledToggle>
  );
}
function List({ children, listId }) {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== listId) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick, disabled = false }) {
  const { close } = useContext(MenuContext);

  function handelClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handelClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.toggle = Toggle;
Menus.list = List;
Menus.button = Button;
Menus.menu = StyledMenu;

export default Menus;
