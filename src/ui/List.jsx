/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import DndItems from "./DndCard";

export default function List({ DATA, setDATA }) {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock an API call.

    buildAndSave(DATA);
  }, [DATA]);

  function buildAndSave(items) {
    const groups = {};

    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }

    // Set the data.
    setItems(items);

    // Makes the groups searchable via their id.
    setGroups(groups);
  }

  const handelEndDrag = (result) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if ("group" === type) {
      const sourceIndex = source.index;
      const targetIndex = destination.index;

      const workValue = items.slice();
      const [deletedItem] = workValue.splice(sourceIndex, 1);
      workValue.splice(targetIndex, 0, deletedItem);

      buildAndSave(workValue);

      return;
    }

    const sourceDroppableIndex = groups[source.droppableId];
    const targetDroppableIndex = groups[destination.droppableId];
    const sourceItems = items[sourceDroppableIndex].items.slice();
    const targetItems =
      source.droppableId !== destination.droppableId
        ? items[targetDroppableIndex].items.slice()
        : sourceItems;

    // Pull the item from the source.
    const [deletedItem] = sourceItems.splice(source.index, 1);
    targetItems.splice(destination.index, 0, deletedItem);

    const workValue = items.slice();
    workValue[sourceDroppableIndex] = {
      ...items[sourceDroppableIndex],
      items: sourceItems,
    };
    workValue[targetDroppableIndex] = {
      ...items[targetDroppableIndex],
      items: targetItems,
    };

    if (result.destination.droppableId === "list") {
      if (result.source.droppabledId === "list") {
        console.log("83");
      } else {
        setDATA((prevData) => {
          setIsLoading(true);
          const newData = [...prevData]; // ایجاد یک کپی جدید از state
          const newItems = [...newData[1].items, { id: draggableId }];
          newData[1] = {
            ...newData[1], // کپی از اولین آیتم
            items: newItems, // به‌روزرسانی بخش مورد نظر
          };
          return newData;
        });
      }
    }
    setItems(workValue);
  };

  return (
    <DragDropContext onDragEnd={(result) => handelEndDrag(result)}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="row"
          >
            {items.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="card col bg-focus text-clear p-0 mx-2"
                >
                  <Draggable draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <DndItems key={item.id} {...item} />
                      </div>
                    )}
                  </Draggable>
                </div>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
