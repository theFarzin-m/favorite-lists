import React, { useState } from "react";

import { useLogout } from "../authentication/useAuth";
import EditProfile from "./EditProfile";
import EditUser from "../authentication/EditUser";
import { Link } from "react-router-dom";

export default function OwenedOperation({ data }) {
  const [isEditUser, setIsEditeUser] = useState(false);
  const { logout, isLoading: isLoagouting } = useLogout();

  return (
    <>
      <button
        className="btn bg-focus w-50 custom-rounded-md rounded-start-0 text-clear"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#edit-profile"
        aria-controls="edit-profile"
      >
        <i className="bi bi-pencil-square ms-2"></i>
        <span className="d-none d-sm-inline">Edite</span>
      </button>
      <div
        className="modal fade px-3 "
        tabIndex="-1"
        aria-labelledby="offcanvasExampleLabel"
        id="edit-profile"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-bg">
              <button
                type="button"
                className="btn p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg text-clear"></i>
              </button>
            </div>
            <div className="modal-body bg-bg">
              {isEditUser ? (
                <EditUser toggleEdit={setIsEditeUser} />
              ) : (
                <EditProfile editeData={data} toggleEdit={setIsEditeUser} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/profile/bookmark"
        className="btn bg-focus w-50 rounded-0 text-clear mx-1"
      >
        <i className="bi bi-bookmarks ms-2"></i>
        <span className="d-none d-sm-inline">Bookmarks</span>
      </Link>
      <button
        className="btn bg-focus w-50 custom-rounded-md rounded-end-0 text-clear"
        onClick={logout}
      >
        <i className="bi bi-box-arrow-right ms-2"></i>
        <span className="d-none d-sm-inline">Logout</span>
      </button>
    </>
  );
}
