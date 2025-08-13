// components/ToolboxItem.jsx
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const ToolboxItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                     rounded-lg px-4 py-3 mb-3 cursor-move shadow-md 
                     hover:shadow-lg hover:scale-105 transition-all duration-200 
                     font-medium tracking-wide"
        >
          {item.label}
        </div>
      )}
    </Draggable>
  );
};

export default ToolboxItem;
