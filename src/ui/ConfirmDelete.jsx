// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";

const CancelBtn = styled.button`
  border: 1px solid var(--primary-100);

  &:hover {
    border: 1px solid var(--primary-100);
    border-radius: 0 !important;
  }
`;

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--text-100);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// eslint-disable-next-line react/prop-types
function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <h3>Delete {resourceName}</h3>
      <p>
        Are you sure you want to delete &quot;{resourceName}&quot; list
        permanently? This action cannot be undone.
      </p>

      <div>
        <CancelBtn
          className="btn"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </CancelBtn>
        <button
          className="btn btn-danger mx-3"
          disabled={disabled}
          onClick={onConfirm}
        >
          DELETE
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
