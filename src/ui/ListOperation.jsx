/* eslint-disable react/prop-types */
import React from "react";
import ListFilter from "./ListFilter";
import SearchBox from "./SearchBox";

export default function ListOperation({
  setQuery,
  query,
  sort,
  setSort,
  time,
  setTime,
  setAsc
}) {
  return (
    <div className="d-flex justify-content-between flex-wrap mb-4 mx-3">
      <SearchBox size="lg" query={query} setQuery={setQuery} />

      <div className="custom-centerize d-none d-md-flex mt-md-3 mt-0 mt-lg-0">
        <ListFilter
          sort={sort}
          time={time}
          setSort={setSort}
          setTime={setTime}
          setAsc={setAsc}
        />
      </div>
      {/* offcanvas for phone */}
      <div className="custom-centerize d-flex d-md-none justify-content-start">
        <button
          className="btn  bg-primary-clear text-dull"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#List-Operation"
          aria-controls="List-Operation"
        >
          <i className="bi bi-funnel"></i>
        </button>
        <div
          className="modal fade px-3 "
          tabIndex="-1"
          aria-labelledby="offcanvasExampleLabel"
          id="List-Operation"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-bg">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-bg">
                <ListFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
