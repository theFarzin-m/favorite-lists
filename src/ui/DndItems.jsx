import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListItem from "./ListItem";

const CardBody = styled.div`
  height: 350px;
  overflow-y: auto;
  & > li {
    border-color: 1px solid var(--bg-300) !important;
  }
`;

export default function DndItems({ id, items, label }) {
  if (!items) return;
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="card-header d-flex justify-content-start align-items-center bg-focus">
            <div className="ms-3 text-nowrap">{label}</div>
          </div>
          <CardBody className="p-1 list-group-flush bg-bg">
            {items.map((item, index) => (
              <div className="list-group-item  mb-2" key={item.id}>
                <Draggable draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ListItem item={item.id} />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </CardBody>
        </div>
      )}
    </Droppable>
  );
}
