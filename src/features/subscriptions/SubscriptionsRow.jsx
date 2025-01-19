import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";

const SubscriptionsStyle = styled.div`
  min-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default function SubscriptionsRow({ data, setSelected, selected }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollContainerRef.current) {
        event.preventDefault();
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollElement = scrollContainerRef.current;

    scrollElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <SubscriptionsStyle
      className="row flex-nowrap row-cols-2 row-cols-sm-3 row-cols-md-4"
      id="subscriptions"
      ref={scrollContainerRef}
    >
      {data.map((sub) => (
        <div key={sub.id} onClick={() => setSelected(sub.subscriber.id)}>
          <button
            className={`btn custom-centerize flex-column border-0 pt-3 ${
              selected == sub.subscriber.id ? "active" : ""
            }`}
            style={{ transition: "none" }}
          >
            <Avatar width="100px" src={sub.subscriber.avatar} />
            <span className="mt-2">{sub.subscriber.username} </span>
            <Link
              className="btn bg-focus px-1 py-0"
              to={`/profile/${sub.subscriber.id}`}
            >
              <small>Profile</small>
              <i className="bi bi-chevron-right"></i>
            </Link>
          </button>
        </div>
      ))}
    </SubscriptionsStyle>
  );
}
