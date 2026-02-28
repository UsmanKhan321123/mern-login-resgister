import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    assignedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true }
);

const Receptionist = mongoose.model("Receptionist", receptionistSchema);

export default Receptionist;
