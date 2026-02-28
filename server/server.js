import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./config/dbConfig.js";
import userRouter from "./routes/userRouter.js";
import doctorRouter from "./routes/doctorRoutes.js";
import receptionistRouter from "./routes/receptionistRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/users", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/receptionist", receptionistRouter);
app.use("/api/patient", patientRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const startServer = async () => {
  await dbConnect();
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();

