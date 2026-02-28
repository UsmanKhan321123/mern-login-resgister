import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { Doctor, Patient, Receptionist } from "../models/index.js";

const router = express.Router();

const parseName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Unknown", lastName: "User" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "User" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
};

const fullName = (doc) => `${doc.firstName || ""} ${doc.lastName || ""}`.trim();

router.use(auth, role("admin"));

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    const payload = patients.map((patient) => ({
      id: patient._id,
      name: fullName(patient),
      email: patient.email || "",
      phone: patient.phone || "",
    }));
    res.json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/patients", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { firstName, lastName } = parseName(name);
    const patient = await Patient.create({ firstName, lastName, email, phone });
    res.status(201).json({
      id: patient._id,
      name: fullName(patient),
      email: patient.email || "",
      phone: patient.phone || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/patients/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { firstName, lastName } = parseName(name);
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone },
      { new: true, runValidators: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({
      id: patient._id,
      name: fullName(patient),
      email: patient.email || "",
      phone: patient.phone || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/patients/:id", async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    const payload = doctors.map((doctor) => ({
      id: doctor._id,
      name: fullName(doctor),
      email: doctor.email || "",
      specialty: doctor.specialty || "",
    }));
    res.json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/doctors", async (req, res) => {
  try {
    const { name, email, specialty } = req.body;
    const { firstName, lastName } = parseName(name);
    const doctor = await Doctor.create({ firstName, lastName, email, specialty });
    res.status(201).json({
      id: doctor._id,
      name: fullName(doctor),
      email: doctor.email || "",
      specialty: doctor.specialty || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/doctors/:id", async (req, res) => {
  try {
    const { name, email, specialty } = req.body;
    const { firstName, lastName } = parseName(name);
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, specialty },
      { new: true, runValidators: true }
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({
      id: doctor._id,
      name: fullName(doctor),
      email: doctor.email || "",
      specialty: doctor.specialty || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/doctors/:id", async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/receptionists", async (req, res) => {
  try {
    const receptionists = await Receptionist.find().sort({ createdAt: -1 });
    const payload = receptionists.map((rec) => ({
      id: rec._id,
      name: fullName(rec),
      email: rec.email || "",
      shift: rec.shift || "",
    }));
    res.json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/receptionists", async (req, res) => {
  try {
    const { name, email, shift } = req.body;
    const { firstName, lastName } = parseName(name);
    const receptionist = await Receptionist.create({ firstName, lastName, email, shift });
    res.status(201).json({
      id: receptionist._id,
      name: fullName(receptionist),
      email: receptionist.email || "",
      shift: receptionist.shift || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/receptionists/:id", async (req, res) => {
  try {
    const { name, email, shift } = req.body;
    const { firstName, lastName } = parseName(name);
    const receptionist = await Receptionist.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, shift },
      { new: true, runValidators: true }
    );
    if (!receptionist) return res.status(404).json({ message: "Receptionist not found" });
    res.json({
      id: receptionist._id,
      name: fullName(receptionist),
      email: receptionist.email || "",
      shift: receptionist.shift || "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/receptionists/:id", async (req, res) => {
  try {
    const deleted = await Receptionist.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Receptionist not found" });
    res.json({ message: "Receptionist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
