import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [exps, setExps] = useState([]);
  const [filteredExps, setFilteredExps] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}experiences`);
        if (res.data?.success) {
          setExps(res.data.result);
          setFilteredExps(res.data.result);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (!query) setFilteredExps(exps);
    else {
      const filtered = exps.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query)
      );
      setFilteredExps(filtered);
    }
  }, [query, exps]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10 flex justify-center">
      <div className="w-full max-w-7xl">
        {filteredExps.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No experiences found {query && `for "${query}"`}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExps.map((e) => (
              <div
                key={e._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <img
                  src={e.image.startsWith("http") ? e.image : `${import.meta.env.VITE_BACKEND_URL}${e.image}`}
                  alt={e.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{e.name}</h3>
                    <p className="text-sm text-gray-500">{e.location}</p>
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">{e.about}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-medium text-gray-700">
                      From ₹{e.cost}
                    </span>
                    <Link
                      to={`/details/${e._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-sm font-medium text-gray-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
