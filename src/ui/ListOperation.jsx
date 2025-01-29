/* eslint-disable react/prop-types */
import React from "react";
import ListFilter from "./ListFilter";
import SearchBox from "./SearchBox";
import Modal from "./Modal";

export default function ListOperation() {
  return (
    <div className="d-flex justify-content-between flex-wrap bg-bg p-4 sticky-top rounded w-100">
      <SearchBox size="lg" />

      <div className="custom-centerize d-none d-md-flex mt-md-3 mt-0 mt-lg-0">
        <ListFilter />
      </div>
      {/* offcanvas for phone */}
      <div className="custom-centerize d-flex d-md-none justify-content-start">
        <Modal>
          <Modal.open opens={"operation"}>
            <div className="btn  bg-primary-clear text-dull">
              <i className="bi bi-funnel"></i>
            </div>
          </Modal.open>
          <Modal.window name={"operation"}>
            <ListFilter />
          </Modal.window>
        </Modal>
      </div>
    </div>
  );
}
