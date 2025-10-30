import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import axios from "axios";

export default function Checkout() {
  const { booking } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!booking || !booking.name) {
    return (
      <div className="text-center mt-10">
        <p>No booking selected.</p>
        <button
          className="mt-4 bg-yellow-400 px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const subtotal = booking.cost * booking.qty;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking`,
        {
          experienceId: booking.experienceId,
          date: booking.date,
          time: booking.time,
          cost: total,
        }
      );

      if (res.data?.success) {
        navigate("/result", {
          state: { success: true, ref: "BOOK" + Math.floor(Math.random() * 10000), data: res.data.result },
        });
      } else {
        navigate("/result", { state: { success: false } });
      }
    } catch (err) {
      console.error("Booking failed:", err);
      navigate("/result", { state: { success: false } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          <p className="text-gray-600 mb-6">
            Confirm your booking details and complete payment.
          </p>
        </div>

        <aside className="bg-white p-6 rounded-lg shadow">
          <div className="font-medium mb-2">{booking.name}</div>
          <div className="text-sm text-gray-500 mb-1">{booking.date}</div>
          <div className="text-sm text-gray-500 mb-4">{booking.time}</div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <div>Subtotal</div>
              <div>₹{subtotal}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <div>Taxes</div>
              <div>₹{taxes}</div>
            </div>
            <div className="flex justify-between mt-4 font-semibold text-lg">
              <div>Total</div>
              <div>₹{total}</div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`mt-4 w-full py-3 rounded ${loading ? "bg-gray-300 text-gray-500" : "bg-yellow-400 hover:bg-yellow-500"}`}
            >
              {loading ? "Processing..." : "Pay & Confirm"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
