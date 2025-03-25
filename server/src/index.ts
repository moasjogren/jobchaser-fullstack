import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import jobRoutes from "./routes/jobRoutes";

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

app.use("/", (req, res) => {
  res.send("WELCOME");
});

const PORT = process.env.PORT || "4000";

app.listen(process.env.PORT, () => console.log(`Server running on ${PORT}`));
