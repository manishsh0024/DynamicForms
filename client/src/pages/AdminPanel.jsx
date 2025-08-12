import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [forms, setForms] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    fetchForms();

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("/api/forms");
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching forms:", err);
      toast.error("Failed to fetch forms!", {
        duration: 3000,
        style: { borderRadius: "8px", background: "#ef4444", color: "#fff" },
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`/api/forms/${id}`);
        fetchForms();
        toast.success("Form deleted successfully!", {
          duration: 3000,
          style: { borderRadius: "8px", background: "#22c55e", color: "#fff" },
        });
      } catch (err) {
        console.error("Error deleting form:", err);
        toast.error("Failed to delete form!", {
          duration: 3000,
          style: { borderRadius: "8px", background: "#ef4444", color: "#fff" },
        });
      }
    }
  };

  const handleEdit = (formId) => {
    navigate(`/edit/${formId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      duration: 3000,
      style: { borderRadius: "8px", background: "#22c55e", color: "#fff" },
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-white to-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl font-extrabold text-gray-900 select-none">
            Admin Panel
          </h2>
          <div className="flex flex-wrap gap-5 items-center">
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
              aria-label="Create New Form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create New Form
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                title="Profile Menu"
              >
                {/* Simple user icon */}
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4z" />
                  <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn">
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-left text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Form List */}
        <section className="bg-white rounded-3xl shadow-xl p-10 sm:p-14">
          {forms.length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-14 select-none">
              No forms available.
            </p>
          ) : (
            <div className="space-y-8">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-2xl font-semibold text-gray-800 mb-5 sm:mb-0 truncate select-text">
                    {form.title}
                  </span>
                  <div className="flex gap-5 flex-wrap justify-center sm:justify-start">
                    <button
                      onClick={() => handleEdit(form._id)}
                      className="flex items-center gap-3 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition duration-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 transition duration-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 4v12m4-12v12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
