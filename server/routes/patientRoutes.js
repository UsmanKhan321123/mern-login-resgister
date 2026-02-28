import express from "express";
import { Patient } from "../models/index.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

// Patient view own profile
router.get("/profile", auth, role("patient"), async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id }).populate("doctor");
    if (!patient)
      return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
