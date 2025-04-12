import React, { lazy, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, replace, useNavigate, useSearchParams } from "react-router-dom";

import Avatar from "../ui/Avatar";
import Loading from "../ui/Loading";
import ListItem from "../ui/ListItem";
import { useGetList, useIncreaseView } from "../features/lists/useList";
import Operations from "../features/lists/Operations";
import MovieDetail from "../ui/MovieDetail";
import { useSelector } from "react-redux";

const CardBody = styled.div`
  height: 100%;
  max-height: 60vh;
  overflow-y: auto;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

const EmptyCard = styled.div`
  opacity: 0.5;
  min-height: 60vh;
`;

const CardHead = styled.div`
  height: 60px;
`;

const WrapperOparations = styled.div`
  z-index: 0;
  position: relative;
  width: ${(props) => (props.$sharing ? "80vw" : "30vw")};
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.5s;
  overflow: hidden;
`;

export default function ListDetails() {
  const [sharing, setSharing] = useState(false);
  const { list, isLoading } = useGetList();
  const selectedID = useSelector((s) => s.list.selectedID);

  const [selectedMovie, setSelectedMovie] = useState(selectedID || "");
  const { increaseView, isPending } = useIncreaseView();

  useEffect(() => {
    if (list && !isLoading) {
      if (!document.cookie.includes(`${list.id}=true`)) {
        document.cookie = `${list.id}=true ; max-age=` + 60 * 60 * 24;
        increaseView(list.id);
      }
    }
  }, [isLoading, list]);

  if (isLoading) return <Loading />;

  const { listName, imdbID, likes, id, views } = list;
  const { username, id: ProfileId, avatar } = list.belongTo;

  return (
    <div>
      <div className="w-100 custom-centerize">
        <WrapperOparations $sharing={sharing}>
          <Operations
            setSharing={setSharing}
            sharing={sharing}
            likesCount={likes}
            listId={id}
            views={views}
          />
        </WrapperOparations>
      </div>
      <div className="row ">
        <div className="col">
          <div className="card bg-focus text-clear p-0 h-100">
            <div>
              <div className="card-header d-flex justify-content-between align-items-center bg-focus">
                <div className="ms-3 text-nowrap">
                  <CardHead className="custom-centerize">
                    <Link to={`/profile/${ProfileId}`}>
                      <Avatar width="60px" src={avatar} />
                    </Link>
                    <span className="fs-5 me-2 text-truncate">
                      {username}&apos;s <b>{listName}</b> favorites
                    </span>
                  </CardHead>
                </div>
              </div>

              <CardBody className="p-1 list-group-flush bg-bg">
                {imdbID.map((i) => (
                  <ListItem
                    item={i}
                    key={i}
                    onClick={() => setSelectedMovie(i)}
                  />
                ))}
              </CardBody>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-focus text-clear p-0">
            <div>
              <div className="card-header d-flex justify-content-between align-items-center bg-focus">
                <div className="ms-3 text-nowrap">
                  <CardHead className="custom-centerize fs-3 text-truncate">
                    Movie/Tv show details
                  </CardHead>
                </div>
              </div>
              <CardBody className="p-1 list-group-flush bg-bg">
                {selectedMovie.length > 0 ? (
                  <MovieDetail imdbID={selectedMovie} />
                ) : (
                  <EmptyCard className="custom-centerize h-100">
                    Click on Movie/Tv show for details
                  </EmptyCard>
                )}
              </CardBody>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
