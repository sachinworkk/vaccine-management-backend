import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoute";
import { deserializeUser } from "./middleware/deserializeUser";
import { requireUser } from "./middleware/requireUser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(userRoutes);
app.get("/product", requireUser, (req, res, next) => {
  // @ts-ignore
  res.send(req.user);
});

app.listen(PORT, () => console.log("server listening on port"));
