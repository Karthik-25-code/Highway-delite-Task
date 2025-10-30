import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../context/BookingContext";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBooking } = useBooking();

  const [exp, setExp] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/experience/${id}`);
        const data = res.data?.result;
        setExp(data);
        if (data?.dates?.length > 0) {
          setSelectedDate(data.dates[0].date);
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!exp) return <div className="text-center mt-10 text-gray-500">Experience not found</div>;

  const subtotal = exp.cost * qty;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const selectedDateObj = exp.dates.find((d) => d.date === selectedDate);

  const handleConfirm = () => {
    setBooking({
      experienceId: exp._id,
      name: exp.name,
      location: exp.location,
      date: selectedDate,
      time: selectedTime,
      qty,
      cost: exp.cost,
    });
    navigate("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="lg:col-span-2">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${exp.image}`}
          alt={exp.name}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-semibold mt-6">{exp.name}</h2>
        <p className="text-gray-600 mt-2">{exp.about}</p>
        <p className="text-sm text-gray-500 mt-1">📍 {exp.location}</p>

        {/* Date Selection */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Choose date</h4>
          <div className="flex gap-3 flex-wrap">
            {exp.dates.map((d) => (
              <button
                key={d.date}
                onClick={() => {
                  setSelectedDate(d.date);
                  setSelectedTime("");
                }}
                className={`px-3 py-2 rounded border ${
                  selectedDate === d.date
                    ? "bg-yellow-100 border-yellow-400"
                    : "bg-white border-gray-200"
                }`}
              >
                {d.date}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Choose time</h4>
          <div className="flex gap-3 flex-wrap">
            {selectedDateObj?.times?.length > 0 ? (
              selectedDateObj.times.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(t)}
                  className={`px-3 py-2 rounded border ${
                    selectedTime === t
                      ? "bg-yellow-100 border-yellow-400"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No slots available for this date.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <aside className="bg-white p-6 rounded-lg shadow">
        <div className="text-sm text-gray-500">Starts at</div>
        <div className="text-xl font-semibold mb-4">₹{exp.cost}</div>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <div>{qty}</div>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <div>Total</div>
            <div>₹{total}</div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedTime}
            className={`mt-4 w-full py-3 rounded ${
              selectedTime
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}
