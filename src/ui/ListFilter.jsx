import React from "react";

export default function ListFilter() {
  return (
    <>
      <div className="ms-lg-4 ms-md-2 mb-4 mb-md-0 text-nowrap">
        <span className="ms-lg-3 ms-md-2 ms-3 fs-5">Time:</span>
        <select
          className="btn bg-primary-clear text-dull"
          name="time"
          id="time"
          defaultValue="0"
        >
          <option value="0">
            All Time
          </option>
          <option value="1">Today</option>
          <option value="7">Week</option>
          <option value="30">Month</option>
          <option value="365">Year</option>
        </select>
      </div>

      <div className="text-nowrap">
        <span className="ms-lg-3 ms-md-2 ms-3 fs-5">Sort By:</span>
        <button className="btn  rounded-0 rounded-end bg-primary-clear text-dull">
          View
        </button>
        <button className="btn rounded-0 bg-primary-clear  text-dull">
          Like
        </button>
        <button className="btn  rounded-0 rounded-start bg-primary-clear text-dull">
          Latest
        </button>
        <button className="btn bg-primary-clear text-dull me-2">
          <i className="bi bi-arrow-down-up"></i>
        </button>
      </div>
    </>
  );
}
