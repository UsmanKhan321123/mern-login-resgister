import express from "express"
import dotenv from dotenv
import dbConnect from "./config/dbConfig.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRouter.js"
import cors from "cors"
dotenv.config();


let app = express();
let port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use("/api/users",userRouter)

app.listen(port, async () => {
  console.log(`Server is running on port : ${port}`);
  dbConnect();
})

