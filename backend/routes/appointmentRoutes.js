import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createAppointmentController,
  deleteAppointmentController,
  getAppointmentController,
  getSingleAppointmentController,
  updateAppointmentController,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create appointment
router.post("/create-appointment", requireSignIn, createAppointmentController);

// Get all appointments
router.get("/get-appointments", getAppointmentController);

// Get a single appointment
router.get("/get-appointments/:id", getSingleAppointmentController);

// Update an appointment
router.put("/update-appointments/:id", requireSignIn, updateAppointmentController);

// Delete an appointment
router.delete("/delete-appointments/:id", requireSignIn, deleteAppointmentController);

export default router;
