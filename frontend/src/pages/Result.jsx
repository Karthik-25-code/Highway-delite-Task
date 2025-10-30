import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, ref, data } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow text-center">
        {success ? (
          <>
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl mb-6">
              ✓
            </div>
            <h2 className="text-2xl font-semibold">Booking Confirmed!</h2>
            <p className="text-gray-500 mt-2">Reference ID: {ref}</p>
            {data && (
              <div className="mt-6 bg-gray-50 p-4 rounded text-left text-sm text-gray-700">
                <p><strong>Experience:</strong> {data.name}</p>
                <p><strong>Date:</strong> {data.date}</p>
                <p><strong>Time:</strong> {data.time}</p>
                <p><strong>Cost:</strong> ₹{data.cost}</p>
              </div>
            )}
            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded"
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white text-3xl mb-6">
              ✕
            </div>
            <h2 className="text-2xl font-semibold">Booking Failed</h2>
            <p className="text-gray-500 mt-2">
              Something went wrong while creating your booking.
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded"
            >
              Back to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
