import Experience from "../models/experienceSchema.js";
import Booking from "../models/bookingSchema.js";

export const getExperiences = async (req, res) => {
  try {
    const result = await Experience.find();
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getExperience = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "Missing experience ID" });

    const result = await Experience.findById(id);
    if (!result)
      return res.status(404).json({ success: false, message: "Experience not found" });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const result = await Booking.find({});
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "Missing booking ID" });

    const result = await Booking.findById(id);
    if (!result)
      return res.status(404).json({ success: false, message: "Booking not found" });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const postExperience = async (req, res) => {
  try {
    const { name, about, location, dates, cost } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !about || !location || !dates || !cost)
      return res.status(400).json({ success: false, message: "Please fill all fields" });

    const parsedDates = typeof dates === "string" ? JSON.parse(dates) : dates;

    const result = await Experience.create({
      name,
      about,
      location,
      image,
      dates: parsedDates,
      cost
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      result
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const postBooking = async (req, res) => {
  try {
    const { experienceId, date, time, cost } = req.body;
    if (!experienceId || !date || !time || !cost)
      return res.status(400).json({ success: false, message: "Please fill all fields" });

    const experience = await Experience.findById(experienceId);
    if (!experience)
      return res.status(404).json({ success: false, message: "Experience not found" });

    const dateEntry = experience.dates.find(
      (d) => d.date.trim().toLowerCase() === date.trim().toLowerCase()
    );
    if (!dateEntry)
      return res.status(400).json({ success: false, message: "Selected date not available" });

    const timeAvailable = dateEntry.times.some(
      (t) => t.trim().toLowerCase() === time.trim().toLowerCase()
    );
    if (!timeAvailable)
      return res.status(400).json({ success: false, message: "Selected time not available" });

    // prevent double booking
    const existingBooking = await Booking.findOne({
      name: experience.name,
      location: experience.location,
      date,
      time,
    });
    if (existingBooking)
      return res.status(400).json({ success: false, message: "Slot already booked" });

    const result = await Booking.create({
      name: experience.name,
      about: experience.about,
      location: experience.location,
      date,
      time,
      cost,
    });

    await Experience.updateOne(
      { _id: experienceId, "dates.date": date },
      { $pull: { "dates.$.times": time } }
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      result,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "Missing experience ID" });

    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Experience not found" });

    await Booking.deleteMany({ name: deleted.name, location: deleted.location });

    res.status(200).json({
      success: true,
      message: "Experience and related bookings deleted successfully",
      deleted
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
