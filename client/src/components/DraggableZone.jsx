// components/DroppableZone.jsx
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const DroppableZone = ({ formElements, setFormElements }) => {
  const updateLabel = (uuid, newLabel) => {
    setFormElements((prev) =>
      prev.map((el) => (el.uuid === uuid ? { ...el, label: newLabel } : el))
    );
  };

  const updateOption = (uuid, index, newValue) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? {
              ...el,
              options: el.options.map((opt, i) => (i === index ? newValue : opt)),
            }
          : el
      )
    );
  };

  const addOption = (uuid) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? { ...el, options: [...el.options, `Option ${el.options.length + 1}`] }
          : el
      )
    );
  };

  const removeOption = (uuid, index) => {
    setFormElements((prev) =>
      prev.map((el) =>
        el.uuid === uuid
          ? { ...el, options: el.options.filter((_, i) => i !== index) }
          : el
      )
    );
  };

  const removeElement = (uuid) => {
    setFormElements((prev) => prev.filter((el) => el.uuid !== uuid));
  };

  return (
    <Droppable droppableId="dropzone">
      {(provided) => (
        <div
          className="flex-1 bg-gray-50 shadow-md p-4 rounded-xl min-h-[500px] border border-gray-200"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-bold mb-3 text-gray-700">Canvas</h2>
          {formElements.length === 0 && (
            <p className="text-gray-400 text-sm italic">Drag form fields here</p>
          )}

          {formElements.map((item, index) => (
            <Draggable draggableId={item.uuid} index={index} key={item.uuid}>
              {(provided) => (
                <div
                  className="mb-4 border border-gray-200 p-4 rounded-lg bg-white shadow-sm relative hover:shadow-md transition-all"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {/* Delete button */}
                  <button
                    onClick={() => removeElement(item.uuid)}
                    className="absolute top-2 right-2 text-red-500 hover:text-white font-bold text-lg bg-black px-3 rounded-md"
                  >
                    ✕
                  </button>

                  {/* Label Input */}
                  <input
                    value={item.label}
                    onChange={(e) => updateLabel(item.uuid, e.target.value)}
                    className="block text-sm font-medium mb-3 border-b border-gray-300 focus:border-blue-500 outline-none w-full pb-1"
                  />

                  {/* Field Types */}
                  {item.type === "text" && (
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="text"
                      disabled
                    />
                  )}

                  {item.type === "textarea" && (
                    <textarea
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled
                    />
                  )}

                  {(item.type === "select" || item.type === "radio") && (
                    <div>
                      {item.options.map((opt, i) => (
                        <div key={i} className="flex gap-2 items-center mb-2">
                          {item.type === "radio" ? (
                            <input type="radio" disabled />
                          ) : (
                            <span className="w-4 h-4 rounded border border-gray-300 bg-white" />
                          )}
                          <input
                            value={opt}
                            onChange={(e) =>
                              updateOption(item.uuid, i, e.target.value)
                            }
                            className="border border-gray-300 px-3 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          <button
                            onClick={() => removeOption(item.uuid, i)}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(item.uuid)}
                        className="text-sm text-blue-600 hover:underline mt-1"
                      >
                        ➕ Add Option
                      </button>
                    </div>
                  )}

                  {item.type === "checkbox" && (
                    <div>
                      {item.options.map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input type="checkbox" disabled />
                          <input
                            value={opt}
                            onChange={(e) =>
                              updateOption(item.uuid, i, e.target.value)
                            }
                            className="border border-gray-300 px-3 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          <button
                            onClick={() => removeOption(item.uuid, i)}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(item.uuid)}
                        className="text-sm text-blue-600 hover:underline mt-1"
                      >
                        ➕ Add Option
                      </button>
                    </div>
                  )}

                  {item.type === "email" && (
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="email"
                      disabled
                    />
                  )}

                  {item.type === "date" && (
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="date"
                      disabled
                    />
                  )}

                  {item.type === "number" && (
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      disabled
                    />
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableZone;
