import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageExperiences() {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/experiences`);
      setExperiences(res.data.result || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/experience/${id}`);
      fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Cost</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((e) => (
            <tr key={e._id} className="hover:bg-gray-50">
              <td className="p-3 border">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${e.image}`}
                  alt={e.name}
                  className="h-12 w-20 object-cover rounded"
                />
              </td>
              <td className="p-3 border">{e.name}</td>
              <td className="p-3 border">{e.location}</td>
              <td className="p-3 border">₹{e.cost}</td>
              <td className="p-3 border">
                <button
                  onClick={() => handleDelete(e._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {experiences.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No experiences available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
