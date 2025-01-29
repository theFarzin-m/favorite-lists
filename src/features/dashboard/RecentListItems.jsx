import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../ui/Avatar";
import { timeDiff } from "../../utils/helpers";



export default function RecentListItems({ list }) {
  const timeAgo = timeDiff(list.created_at);
  
  return (
    <li className="list-group-item custom-centerize justify-content-between mt-4">
      <div className="custom-centerize">
        <Avatar width="40px" src={list.belongTo.avatar} />
        <Link to={`/explorer/list/${list.id}`}>
          <span className="me-2">{list.listName}</span>
        </Link>
      </div>
      <div className="">
        <span className="mx-2">
          <i className="bi bi-suit-heart"></i> <span>{list.likes}</span>
        </span>
        <span className="mx-2">
          <i className="bi bi-eye"></i> <span>{list.views}</span>
        </span>
      </div>

      <span className="">{timeAgo}</span>
    </li>
  );
}
