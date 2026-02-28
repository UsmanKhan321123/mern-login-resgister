import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    address: { type: String },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    medicalHistory: [
      {
        condition: { type: String, required: true },
        diagnosisDate: { type: Date },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
