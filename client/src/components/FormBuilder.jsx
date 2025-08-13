// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";
// import { v4 as uuid } from "uuid";
// import ToolboxItem from "./ToolBoxItem";
// import DroppableZone from "./DraggableZone";
// import FormPreview from "./FormPreview";
// import axios from "../axios";
// import toast from "react-hot-toast";

// const toolboxItems = [
//   { id: "number", label: "Number Field", type: "number" },
//   { id: "email", label: "Email Field", type: "email" },
//   { id: "date", label: "Date Picker", type: "date" },
//   { id: "text", label: "Text Field", type: "text" },
//   { id: "select", label: "Dropdown", type: "select", options: ["Option 1"] },
//   { id: "radio", label: "Radio Group", type: "radio", options: ["Yes", "No"] },
//   { id: "textarea", label: "Textarea", type: "textarea" },
//   { id: "checkbox", label: "Checkbox Group", type: "checkbox", options: ["Option 1"] },
// ];

// const FormBuilder = () => {
//   const { formId } = useParams();
//   const navigate = useNavigate();

//   const [formTitle, setFormTitle] = useState("Unnamed Form");
//   const [formElements, setFormElements] = useState([]);
//   const [previewMode, setPreviewMode] = useState(false);

//   useEffect(() => {
//     if (!formId) return;
//     (async () => {
//       try {
//         const res = await axios.get(`/api/forms/${formId}`);
//         setFormTitle(res.data.title || "Untitled Form");
//         setFormElements(res.data.elements || []);
//       } catch (err) {
//         console.error("Error fetching form:", err);
//         alert("Failed to load form for editing.");
//       }
//     })();
//   }, [formId]);

//   const handleDragEnd = useCallback(({ source, destination, draggableId }) => {
//     if (!destination) return;

//     if (source.droppableId === "toolbox" && destination.droppableId === "dropzone") {
//       const item = toolboxItems.find((i) => i.id === draggableId);
//       if (item) {
//         setFormElements((prev) => [
//           ...prev,
//           {
//             ...item,
//             uuid: uuid(),
//             label: `${item.label} label`,
//             options: item.options ? [...item.options] : [],
//           },
//         ]);
//       }
//     } else if (
//       source.droppableId === "dropzone" &&
//       destination.droppableId === "dropzone"
//     ) {
//       setFormElements((prev) => {
//         const copy = Array.from(prev);
//         const [moved] = copy.splice(source.index, 1);
//         copy.splice(destination.index, 0, moved);
//         return copy;
//       });
//     }
//   }, []);

//   const saveForm = useCallback(async () => {
//     if (!formTitle.trim()) {
//       toast.error("Form title cannot be empty");
//       return;
//     }
//     if (formElements.length === 0) {
//       toast.error("Please add some form elements");
//       return;
//     }
//     try {
//       const payload = { title: formTitle.trim(), elements: formElements };
//       let res;
//       if (formId) {
//         res = await axios.put(`/api/forms/${formId}`, payload);
//         toast.success("Form updated successfully!");
//       } else {
//         res = await axios.post("/api/forms", payload);
//         toast.success("New form saved successfully!");
//       }
//       navigate("/admin");
//       console.log("Save Result:", res.data);
//     } catch (error) {
//       console.error("Error saving form:", error);
//       toast.error("Failed to save form");
//     }
//   }, [formId, formTitle, formElements, navigate]);

//   return (
//     <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <section className="w-full max-w-7xl flex flex-col gap-8">
//         {/* Header */}
//         <header className="sticky top-0 z-20 bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <input
//             type="text"
//             aria-label="Form Title"
//             value={formTitle}
//             onChange={(e) => setFormTitle(e.target.value)}
//             placeholder="Enter Form Title"
//             className="w-full sm:w-1/2 text-3xl font-extrabold text-gray-900 rounded-lg border border-gray-300 px-5 py-3 focus:outline-none focus:ring-4 focus:ring-blue-600"
//           />
//           <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setPreviewMode((prev) => !prev)}
//               className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-600 transition"
//             >
//               {previewMode ? (
//                 <>
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                   Edit Mode
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.91 1.91A7 7 0 1117 12H20"
//                     />
//                   </svg>
//                   Preview Form
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={saveForm}
//               className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 transition"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
//                 />
//               </svg>
//               Save Form
//             </button>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="flex items-center gap-5">
//         <DragDropContext onDragEnd={handleDragEnd}>
//           {/* Toolbox */}
//           <Droppable droppableId="toolbox">
//             {(provided) => (
//               <aside
//                 className="order-2 lg:order-1 w-full lg:w-64 bg-white rounded-xl shadow-md p-6"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 aria-label="Toolbox"
//               >
//                 <h2 className="text-xl font-semibold mb-6 text-gray-900">
//                   Toolbox
//                 </h2>
//                 <div className="flex flex-col gap-4">
//                   {toolboxItems.map((item, index) => (
//                     <ToolboxItem key={item.id} item={item} index={index} />
//                   ))}
//                 </div>
//                 {provided.placeholder}
//               </aside>
//             )}
//           </Droppable>

//           {/* Form Elements or Preview */}
//           <section className=" order-1 lg:order-2 flex-1 bg-white rounded-xl shadow-md p-6 min-h-[450px] overflow-y-auto">
//             {previewMode ? (
//               <FormPreview formElements={formElements} />
//             ) : (
//               <DroppableZone
//                 formElements={formElements}
//                 setFormElements={setFormElements}
//               />
//             )}
//           </section>
//         </DragDropContext>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default FormBuilder;

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import ToolboxItem from "./ToolBoxItem";
import DroppableZone from "./DraggableZone";
import FormPreview from "./FormPreview";
import axios from "../axios";
import toast from "react-hot-toast";

const toolboxItems = [
  { id: "name", label: "Name", type: "text" },
  { id: "number", label: "Number", type: "number" },
  { id: "email", label: "Email", type: "email" },
  { id: "date", label: "Date", type: "date" },
  { id: "text", label: "Text", type: "text" },
  { id: "select", label: "Dropdown", type: "select", options: ["Option 1"] },
  { id: "radio", label: "Radio Buttons", type: "radio", options: ["Yes", "No"] },
  {
    id: "checkbox",
    label: "Checkbox",
    type: "checkbox",
    options: ["Option 1"],
  },
];

const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState("Unnamed Form");
  const [formElements, setFormElements] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!formId) return;
    (async () => {
      try {
        const res = await axios.get(`/api/forms/${formId}`);
        setFormTitle(res.data.title || "Untitled Form");
        setFormElements(res.data.elements || []);
      } catch (err) {
        console.error("Error fetching form:", err);
        alert("Failed to load form for editing.");
      }
    })();
  }, [formId]);

  const handleDragEnd = useCallback(({ source, destination, draggableId }) => {
    if (!destination) return;

    if (
      source.droppableId === "toolbox" &&
      destination.droppableId === "dropzone"
    ) {
      const item = toolboxItems.find((i) => i.id === draggableId);
      if (item) {
        setFormElements((prev) => [
          ...prev,
          {
            ...item,
            uuid: uuid(),
            label: `${item.label} label`,
            options: item.options ? [...item.options] : [],
          },
        ]);
      }
    } else if (
      source.droppableId === "dropzone" &&
      destination.droppableId === "dropzone"
    ) {
      setFormElements((prev) => {
        const copy = Array.from(prev);
        const [moved] = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, moved);
        return copy;
      });
    }
  }, []);

  const saveForm = useCallback(async () => {
    if (!formTitle.trim()) {
      toast.error("Form title cannot be empty");
      return;
    }
    if (formElements.length === 0) {
      toast.error("Please add some form elements");
      return;
    }
    try {
      const payload = { title: formTitle.trim(), elements: formElements };
      let res;
      if (formId) {
        res = await axios.put(`/api/forms/${formId}`, payload);
        toast.success(`Form updated successfully! ID: ${res.data._id}`);
      } else {
        res = await axios.post("/api/forms", payload);
        toast.success(`New form saved successfully! ID: ${res.data._id}`);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save form");
    }
  }, [formId, formTitle, formElements, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <section className="w-full max-w-7xl flex flex-col gap-8">
        {/* Header */}
        <header className="sticky top-0 z-20 backdrop-blur-lg bg-white/70 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-200">
          <input
            type="text"
            aria-label="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter Form Title"
            className="w-full sm:w-1/2 text-2xl font-bold text-gray-900 rounded-lg border border-gray-300 px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPreviewMode((prev) => !prev)}
              className={`px-5 py-3 rounded-lg flex items-center gap-2 transition ${
                previewMode
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              {previewMode ? "Switch to Edit" : "Switch to Preview"}
            </button>
            <button
              onClick={saveForm}
              className="px-5 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 transition"
            >
              Save Form
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            {/* Toolbox */}
            <Droppable droppableId="toolbox">
              {(provided) => (
                <aside
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full lg:w-80  bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Input Toolbox
                  </h2>
                  <div className="flex flex-col gap-3">
                    {toolboxItems.map((item, index) => (
                      <ToolboxItem key={item.id} item={item} index={index} />
                    ))}
                  </div>
                  {provided.placeholder}
                </aside>
              )}
            </Droppable>

            {/* Canvas / Preview */}
            <section className="flex-1 bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 border border-gray-200 min-h-[500px]">
              {previewMode ? (
                <FormPreview formElements={formElements} />
              ) : (
                <Droppable droppableId="dropzone">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[440px] flex flex-col gap-4 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
                    >
                      {formElements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Drag fields here
                        </div>
                      ) : (
                        <DroppableZone
                          formElements={formElements}
                          setFormElements={setFormElements}
                        />
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </section>
          </DragDropContext>
        </div>
      </section>
    </main>
  );
};

export default FormBuilder;
