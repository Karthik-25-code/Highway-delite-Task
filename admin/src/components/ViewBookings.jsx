import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings`);
      setBookings(res.data.result || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Experience</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Time</th>
            <th className="p-3 border">Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50 text-gray-800">
              <td className="p-3 border">{b.name}</td>
              <td className="p-3 border">{b.location}</td>
              <td className="p-3 border">{b.date}</td>
              <td className="p-3 border">{b.time}</td>
              <td className="p-3 border">₹{b.cost}</td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No bookings yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
