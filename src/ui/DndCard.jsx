/* eslint-disable react/prop-types */
import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";

const CardBody = styled.div`
  height: 350px;
  overflow-y: auto;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

export default function DndCard({ table1, table2, setTable1, setTable2 }) {
  const handleDragStart = (e, row) => {
    e.dataTransfer.setData("row", JSON.stringify(row));
  };
  
  const handleDragOver = (e) => {
    e.preventDefault(); // اجازه‌ی دراپ کردن را می‌دهد
  };

  const handleDrop = (e) => {
    const row = JSON.parse(e.dataTransfer.getData("row"));
    
    const rowTarget = e.target.closest("li");
    if (rowTarget) {
      var targetId = rowTarget.dataset.id
      var indexTaget = table2.findIndex((x) => x.id == targetId);
    }

    setTable2((prev) => prev.filter((r) => r.id !== row.id));

    setTable2((prev) => {
      let tmp = [...prev];
      tmp.splice(indexTaget, 0, row);
      return tmp;
    });
  };

  const renderTable = (rows, tableName, setTable) => (
    <div
      border="1"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, tableName, setTable)}
      className="card col bg-focus text-clear p-0 mx-2"
    >
      <div className="card-header d-flex justify-content-start align-items-center bg-focus">
        <div className="ms-3 text-nowrap">{tableName}</div>
      </div>
      <CardBody className="p-1 list-group-flush bg-bg">
        {rows.map((row) => (
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, row, tableName)}
            className="list-group-item  mb-2"
            key={row.id}
            data-id={row.id}
          >
            <ListItem item={row.id} />
          </li>
        ))}
      </CardBody>
    </div>
  );

  return (
    <>
      {renderTable(table1, "Movies", setTable1)}
      {renderTable(table2, "List", setTable2)}
    </>
  );
}
