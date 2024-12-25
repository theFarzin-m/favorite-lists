import React, { useEffect, useState } from "react";
import styled from "styled-components";

import List from "../../ui/List";
import SearchBox from "../../ui/SearchBox";
import { useFetch } from "../../hooks/usefetch";
import { url } from "../../assets/variables";
import { useCreateList } from "./useList";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { useAuth } from "../authentication/useAuth";

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
  const [query, setQuery] = useState("batman");
  const [listName, setListName] = useState("");
  const { data, isPending } = useFetch(url + "s=" + query);
  const [imdbID, setImdbID] = useState([]);
  const { user, isLoading } = useAuth();

  const [DATA, setDATA] = useState([
    {
      id: "movies",
      label: "All movies",
      items: [],
    },
    {
      id: "list",
      label: "Your List",
      items: [],
    },
  ]);
  const { createList, isCreating } = useCreateList();

  useEffect(() => {
    if (!isPending && data.Response !== "True") return;
    if (query.length > 3 && data && data.Search) {
      const search = data.Search.map((d) => ({
        id: d.imdbID,
      }));

      setDATA((prevData) => {
        const newData = [...prevData]; // ایجاد یک کپی جدید از state
        newData[0] = {
          ...newData[0], // کپی از اولین آیتم
          items: search, // به‌روزرسانی بخش مورد نظر
        };
        return newData;
      });
    }
  }, [query]);

  const handelConfirm = () => {
    if (!DATA[1].items || !listName) {
      toast.error("pleas drag and drop some movies and select a name");
      return;
    }
    let selected = [];
    selected = DATA[1].items.map((d) => d.id);

    setImdbID((i) => selected);

    const newList = {
      listName: listName,
      imdbID: selected,
      likes: 0,
      views: 0,
      belongTo: user.id,
    };

    createList(newList);
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
        <CancelBtn className="btn text-clear ms-3">Cancel</CancelBtn>

        <SearchBox size="md" query={query} setQuery={setQuery} />
      </div>
      <div className="row">
        <List DATA={DATA} setDATA={setDATA} />
      </div>
    </>
  );
}
