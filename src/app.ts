import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { JwtPayload } from "jsonwebtoken";

import userRoutes from "./routes/userRoute";
import vaccineRoutes from "./routes/vaccineRoute";
import tokenRoutes from "./routes/tokenRoute";

import * as routes from "./constants/urls";

import { requireUser } from "./middlewares/requireUser";
import { errorHandler } from "./middlewares/errorHandler";
import { deserializeUser } from "./middlewares/deserializeUser";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | null;
    }
  }
}

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(routes.ROOT, userRoutes);
app.use(routes.TOKEN, tokenRoutes);

app.use(deserializeUser);

app.use(routes.VACCINE, vaccineRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log("server listening on port"));
