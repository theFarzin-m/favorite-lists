import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ListFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState(() => searchParams.get("time") || "0");
  const [sort, setSort] = useState(
    () => searchParams.get("sort") || "created_at"
  );
  const [asc, setAsc] = useState(() => searchParams.get("asc") || false);

  useEffect(() => {
    setSearchParams({ time, sort, asc });
  }, [asc, sort, time]);

  return (
    <>
      <div className="ms-lg-4 ms-md-2 mb-4 mb-md-0 text-nowrap">
        <span className="ms-lg-3 ms-md-2 ms-3 fs-5">Time:</span>
        <select
          className="btn bg-primary-clear text-dull"
          name="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="0">All Time</option>
          <option value="1">Today</option>
          <option value="7">Week</option>
          <option value="30">Month</option>
          <option value="365">Year</option>
        </select>
      </div>

      <div className="text-nowrap">
        <span className="ms-lg-3 ms-md-2 ms-3 fs-5">Sort By:</span>
        <button
          className={`btn  rounded-0 rounded-end bg-primary-clear text-dull ${
            sort === "views" ? "active" : ""
          }`}
          onClick={() => setSort("views")}
        >
          View
        </button>
        <button
          className={`btn rounded-0 bg-primary-clear  text-dull ${
            sort === "likes" ? "active" : ""
          }`}
          onClick={() => setSort("likes")}
        >
          Like
        </button>
        <button
          className={`btn  rounded-0 rounded-start bg-primary-clear text-dull ${
            sort === "created_at" ? "active" : ""
          }`}
          onClick={() => setSort("created_at")}
        >
          Latest
        </button>
        <button
          className="btn bg-primary-clear text-dull me-2"
          onClick={() => setAsc((a) => !a)}
        >
          <i className="bi bi-arrow-down-up"></i>
        </button>
      </div>
    </>
  );
}
