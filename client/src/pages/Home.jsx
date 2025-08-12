import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("/api/forms");
        setForms(res.data);
      } catch (err) {
        console.error("Error fetching forms:", err);
      }
    };

    fetchForms();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 sm:mb-0 tracking-tight">
            Available Forms
          </h1>
          <Link
            to="/admin-login"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Admin Login
          </Link>
        </header>

        {/* Content */}
        {forms.length === 0 ? (
          <p className="text-center text-lg text-gray-600 mt-20">
            No forms available at the moment.
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <li
                key={form._id}
                className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 truncate">
                  {form.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {/* Optional description placeholder */}
                  Customize your form with ease.
                </p>
                <Link
                  to={`/form/${form._id}`}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                >
                  <svg
                    className="w-5 h-5"
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
                  Fill Form
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Home;
