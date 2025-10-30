import React, { useState } from "react";
import AddExperience from "../components/AddExperience";
import ManageExperiences from "../components/ManageExperiences";
import ViewBookings from "../components/ViewBookings";

export default function AdminDashboard() {
  const [tab, setTab] = useState("add");

  const tabs = [
    { key: "add", label: "Add Experience" },
    { key: "manage", label: "Manage Experiences" },
    { key: "bookings", label: "View Bookings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Admin Dashboard
      </h1>

      <div className="flex justify-center mb-8 gap-3 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full border transition-all ${
              tab === t.key
                ? "bg-yellow-400 text-black border-yellow-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {tab === "add" && <AddExperience />}
        {tab === "manage" && <ManageExperiences />}
        {tab === "bookings" && <ViewBookings />}
      </div>
    </div>
  );
}
