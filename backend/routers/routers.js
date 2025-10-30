import {getBookings,getExperience,getExperiences,postBooking,postExperience,getBooking,deleteExperience} from "../controllers/Controllers.js";
import express from 'express'
import upload from "../middlewares/upload.js";
const router=express.Router()

router.get("/experiences", getExperiences);
router.get("/experience/:id", getExperience);
router.get("/bookings", getBookings);
router.get("/booking/:id", getBooking);

router.post("/experience", upload.single("image"), postExperience)
router.post("/booking", postBooking);

router.delete("/experience/:id", deleteExperience);

export default router;