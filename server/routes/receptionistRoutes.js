import express from "express";
import { Patient, Doctor } from "../models/index.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

// Receptionist creates patient
router.post("/create-patient", auth, role("receptionist"), async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Assign doctor to patient
router.put(
  "/assign-doctor/:patientId",
  auth,
  role("receptionist"),
  async (req, res) => {
    try {
      const { doctorId } = req.body;

      const patient = await Patient.findById(req.params.patientId);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      patient.doctor = doctorId;
      await patient.save();

      await Doctor.findByIdAndUpdate(doctorId, { $addToSet: { patients: patient._id } });

      res.json({ message: "Doctor assigned successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
