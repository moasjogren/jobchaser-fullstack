import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import jobRoutes from "./routes/jobRoutes";
import { Request, Response } from "express";

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Railway funkar");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
