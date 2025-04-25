import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBox from "../../ui/SearchBox";
import { useFetch } from "../../hooks/usefetch";
import { url } from "../../assets/variables";
import { useCreateList } from "./useList";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import DndCard from "../../ui/DndCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PhoneCreateRow from "../../ui/PhoneCreateRow";

const CancelBtn = styled.button`
  border: 1px solid var(--primary-100);

  &:hover {
    border: 1px solid var(--primary-100);
    border-radius: 0 !important;
  }
`;

const Input = styled.input`
  border: 1px solid var(--text-200) !important;
  transition: all 0.5s;
  color: var(--text-100);
  transition: all 0.3s;
  &:focus,
  &:focus-visible {
    outline: none !important;
    box-shadow: none;
    background-color: var(--bg-100);
    color: var(--text-100);
    border-radius: 0 !important;
  }
  &::placeholder {
    color: var(--text-100);
  }
`;

export default function CreateList() {
  const navigate = useNavigate();
  const { id: listId } = useParams();
  const profileId = useSelector((s) => s.profile.profileId);
  const { createList, isCreating } = useCreateList();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [listName, setListName] = useState("");
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const { data, isPending } = useFetch(url + "s=" + query);

  useEffect(() => {
    if (!isPending && data.Response !== "True") return;
    if (query.length > 3 && data && data.Search) {
      const search = data.Search.map((d) => ({
        id: d.imdbID,
        isChecked: table2.map((i) => i.id).includes(d.imdbID),
      }));

      setTable1(() => search);
    }
  }, [data, isPending, query, table2]);

  useEffect(() => {
    setTable2([]);
    setListName("");
    async function getList() {
      const { data, error } = await supabase
        .from("list")
        .select("*")
        .eq("id", listId)
        .single();

      if (error) {
        console.log(error);
        throw new Error("coudn't get list");
      }

      setListName(data.listName);

      let listItems = [];
      listItems = data.imdbID.reduce((acc, curr) => [...acc, { id: curr }], []);
      setTable2(listItems);
    }
    if (listId) {
      getList();
    }
  }, [listId]);

  const handelConfirm = () => {
    if (!table2.length > 0 || !listName) {
      toast.error("pleas drag and drop some movies and select a name");
      return;
    } else if (table2.length > 10) {
      toast.error("yourt list cannot be more than 10 movies or series");
      return;
    }
    let selected = [];
    selected = table2.map((d) => d.id);

    let newList;

    if (listId) {
      newList = {
        listName: listName,
        imdbID: selected,
      };
      createList({ newList, listId });
    } else {
      newList = {
        listName: listName,
        imdbID: selected,
        likes: 0,
        views: 0,
        belongTo: profileId,
      };
      createList({ newList });
    }
  };

  const handelDelete = (imdbId) => {
    setTable2((row) => row.filter((item) => item.id !== imdbId));
  };

  const handelAdd = (imdbID) => {
    setTable2((prev) => {
      var tmp = prev.includes(imdbID)
        ? prev.filter((item) => item.id !== imdbID)
        : [...prev, { id: imdbID }];

      return tmp;
    });
  };

  const handelMoving = (imdbID, toTop) => {
    setTable2((prev) => {
      const index = prev.map((i) => i.id).indexOf(imdbID);
      const dir = toTop ? index - 1 : index + 1;
      let tmp = prev.filter((i) => i.id !== imdbID);
      console.log(prev, imdbID);

      tmp.splice(dir, 0, { id: imdbID });
      return tmp;
    });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-start mb-4 flex-wrap">
        <label className="label-control mb-2 mb-lg-0">
          <span className="mb-2 fs-5">List Title:</span>
          <Input
            className="form-control bg-bg"
            placeholder="List Title"
            type="text"
            onChange={(e) => setListName(e.target.value)}
            value={listName}
            required
          />
        </label>
        <button
          className="btn bg-primary-clear text-dull mx-3 mb-2 mb-lg-0"
          onClick={handelConfirm}
          disabled={isCreating}
        >
          confirm
        </button>
        <CancelBtn
          className="btn text-clear ms-3 mb-2 mb-lg-0"
          onClick={() => navigate(-1)}
        >
          Cancel
        </CancelBtn>

        <SearchBox size="md" />
      </div>
      {window.innerWidth < 992 ? (
        <>
          <div
            className="row border flex-nowrap rounded p-2 mx-2 d-lg-none"
            style={{ minHeight: "250px", overflowX: "auto" }}
          >
            {table2.length > 0 ? (
              table2.map((item, i) => (
                <PhoneCreateRow
                  isList={true}
                  key={item.id}
                  item={item.id}
                  handelDelete={handelDelete}
                  handelMoving={handelMoving}
                  isFirst={i === 0}
                  isLast={i + 1 === table2.length}
                />
              ))
            ) : (
              <p className="text-secondary">Your list is Empty</p>
            )}
          </div>

          <div
            className="row border flex-nowrap rounded p-2 mt-3 mx-2 d-lg-none"
            style={{ minHeight: "250px", overflowX: "auto" }}
          >
            {table1.length > 0 ? (
              table1.map((item) => (
                <PhoneCreateRow
                  isList={false}
                  key={item.id}
                  item={item.id}
                  handelAdd={handelAdd}
                  isChecked={item.isChecked}
                />
              ))
            ) : (
              <p className="text-secondary">Search somthing</p>
            )}
          </div>
        </>
      ) : (
        <div className="row d-none d-lg-flex">
          <DndCard
            table1={table1}
            table2={table2}
            setTable1={setTable1}
            setTable2={setTable2}
            handelDelete={handelDelete}
          />
        </div>
      )}
    </>
  );
}
