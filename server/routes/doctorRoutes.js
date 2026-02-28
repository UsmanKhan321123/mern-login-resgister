import express from "express";
import { Doctor, Patient } from "../models/index.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

// Doctor Dashboard (only doctor)
router.get("/dashboard", auth, role("doctor"), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate("patients");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doctor updates patient medical history
router.put("/patient/:id", auth, role("doctor"), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.medicalHistory.push(req.body);
    await patient.save();

    res.json({ message: "Medical history updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
