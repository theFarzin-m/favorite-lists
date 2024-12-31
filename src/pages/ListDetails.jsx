import React, { lazy, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import Avatar from "../ui/Avatar";
import Loading from "../ui/Loading";
import ListItem from "../ui/ListItem";
import { useAuth } from "../features/authentication/useAuth";
import { useGetList } from "../features/lists/useList";
import Operations from "../features/lists/Operations";
import MovieDetail from "../ui/MovieDetail";
import { getCurrentProfile } from "../services/ApiProfile";

const CardBody = styled.div`
  height: 400px;
  overflow-y: auto;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

const EmptyCard = styled.div`
  opacity: 0.5;
`;

const CardHead = styled.div`
  height: 60px;
`;

const WrapperOparations = styled.div`
  z-index: 0;
  position: relative;
  width: ${(props) => (props.$sharing ? "70vw" : "20vw")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.5s;
  overflow: hidden;
`;

export default function ListDetails() {
  const [sharing, setSharing] = useState(false);
  const { list, isLoading: isLoading2 } = useGetList();
  const [selectedMovie, setSelectedMovie] = useState("");

  if (isLoading2) return <Loading />;

  const { listName, imdbID, likes, id } = list;
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
          />
        </WrapperOparations>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="card col bg-focus text-clear p-0 mx-4">
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
        </div>
        <div className="col-6">
          <div className="row">
            <div className="card col bg-focus text-clear p-0 mx-4">
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
    </div>
  );
}
