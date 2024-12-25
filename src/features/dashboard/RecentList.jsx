import React from "react";

import ListAvatar from "../../ui/ListAvatar";

export default function RecentList() {
  return (
    <div className="card bg-focus custom-rounded-lg text-clear border-0">
      <div className="card-body">
        <h5 className="card-title">Recent Lists</h5>
        <ul className="bg-focus border-0 text-clear mb-2">
          <li className="list-group-item custom-centerize justify-content-between mt-4">
            <div className="custom-centerize">
              <ListAvatar width="40px" />
              <span className="me-2 ms-4">Comedy</span>
            </div>
            <div>
              <span className="mx-2">
                <i className="bi bi-suit-heart"></i> <span>3</span>
              </span>
              <span className="mx-2">
                <i className="bi bi-eye"></i> <span>10</span>
              </span>
            </div>

            <span className="mx-3">Movies</span>

            <span className="mx-3">2 days ago</span>
          </li>
          <li className="list-group-item custom-centerize justify-content-between mt-4">
            <div className="custom-centerize">
              <ListAvatar width="40px" />
              <span className="me-2 ms-4">Comedy</span>
            </div>
            <div>
              <span className="mx-2">
                <i className="bi bi-suit-heart"></i> <span>3</span>
              </span>
              <span className="mx-2">
                <i className="bi bi-eye"></i> <span>10</span>
              </span>
            </div>

            <span className="mx-3">Movies</span>

            <span className="mx-3">2 days ago</span>
          </li>

          <li className="list-group-item custom-centerize justify-content-between mt-4">
            <div className="custom-centerize">
              <ListAvatar width="40px" />
              <span className="me-2 ms-4">Comedy</span>
            </div>
            <div>
              <span className="mx-2">
                <i className="bi bi-suit-heart"></i> <span>3</span>
              </span>
              <span className="mx-2">
                <i className="bi bi-eye"></i> <span>10</span>
              </span>
            </div>

            <span className="mx-3">Movies</span>

            <span className="mx-3">2 days ago</span>
          </li>

          <li className="list-group-item custom-centerize justify-content-between mt-4">
            <div className="custom-centerize">
              <ListAvatar width="40px" />
              <span className="me-2 ms-4">Comedy</span>
            </div>
            <div>
              <span className="mx-2">
                <i className="bi bi-suit-heart"></i> <span>3</span>
              </span>
              <span className="mx-2">
                <i className="bi bi-eye"></i> <span>10</span>
              </span>
            </div>

            <span className="mx-3">Movies</span>

            <span className="mx-3">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
