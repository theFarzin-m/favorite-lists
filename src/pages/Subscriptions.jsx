import React, { lazy, useEffect, useRef } from "react";
import styled from "styled-components";

import Card from "../ui/Card";
import ListOperation from "../ui/ListOperation";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useGetSubscriptions } from "../features/profile/useProfile";

const SubscriptionsStyle = styled.div`
  min-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default function Subscriptions() {
  const scrollContainerRef = useRef(null);
  const {data, isLoading} = useGetSubscriptions()

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
    <>
      <SubscriptionsStyle
        className="row flex-nowrap row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 pb-3 mb-4"
        id="subscriptions"
        ref={scrollContainerRef}
      >
        <div>
          <button className="btn custom-centerize flex-column active border-0 pt-3">
            <Avatar width="100px" />
            <span className="mt-2">username</span>
            <Link className="btn bg-focus px-1 py-0" to="/Profile">
              <small>Profile</small>
              <i className="bi bi-chevron-right"></i>
            </Link>
          </button>
        </div>

        
      </SubscriptionsStyle>
      <ListOperation />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* <Card /> */}
      </div>
    </>
  );
}
