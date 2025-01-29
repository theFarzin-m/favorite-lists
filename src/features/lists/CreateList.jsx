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
      }));

      setTable1(() => search);
    }
  }, [data, isPending, query]);

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

  const handelDelete = (imdbId) => {
    setTable2((row) => row.filter((item) => item.id !== imdbId));
  };

  const handelConfirm = () => {
    if (!table2 || !listName) {
      toast.error("pleas drag and drop some movies and select a name");
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

  return (
    <>
      <div className="d-flex align-items-end justify-content-start mb-4">
        <label className="label-control">
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
          className="btn bg-primary-clear text-dull mx-3"
          onClick={handelConfirm}
          disabled={isCreating}
        >
          confirm
        </button>
        <CancelBtn className="btn text-clear ms-3" onClick={() => navigate(-1)}>Cancel</CancelBtn>

        <SearchBox size="md" />
      </div>
      <div className="row">
        <DndCard
          table1={table1}
          table2={table2}
          setTable1={setTable1}
          setTable2={setTable2}
          handelDelete={handelDelete}
        />
      </div>
    </>
  );
}
