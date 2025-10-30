import React, { useState } from "react";
import axios from "axios";

export default function AddExperience() {
  const [form, setForm] = useState({
    name: "",
    about: "",
    location: "",
    cost: "",
    dates: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      const parsedDates = JSON.stringify(
        form.dates.split(";").map((d) => {
          const [date, times] = d.split(":");
          return { date: date.trim(), times: times.split(",").map((t) => t.trim()) };
        })
      );

      formData.set("dates", parsedDates);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/experience`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setMessage("✅ Experience added successfully!");
        setForm({ name: "", about: "", location: "", cost: "", dates: "", image: null });
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add experience.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Experience Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="about"
        placeholder="About the Experience"
        value={form.about}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="number"
        name="cost"
        placeholder="Cost (₹)"
        value={form.cost}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="dates"
        placeholder="Format: 20-1-25:09:00am,10:00am; 21-1-25:11:00am"
        value={form.dates}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
        required
      />
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold"
      >
        Add Experience
      </button>
      {message && <p className="text-center mt-3">{message}</p>}
    </form>
  );
}
