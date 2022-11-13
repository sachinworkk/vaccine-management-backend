import dotenv from "dotenv";
import express from "express";

import userRoutes from "./routes/userRoute";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));

app.use(userRoutes);

app.listen(PORT, () => console.log("server listening on port"));
