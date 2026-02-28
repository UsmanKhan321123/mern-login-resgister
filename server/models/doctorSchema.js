import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    specialty: { type: String, required: true },
    experience: { type: Number },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
