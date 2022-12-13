import cors from "cors";

import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";

import { JwtPayload } from "jsonwebtoken";

import userRoutes from "./routes/userRoute";

import tokenRoutes from "./routes/tokenRoute";
import vaccineRoutes from "./routes/vaccineRoute";

import { signOut } from "./controllers/userController";

import * as routes from "./constants/urls";

import { errorHandler } from "./middlewares/errorHandler";
import { deserializeUser } from "./middlewares/deserializeUser";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | null;
    }
  }
}

const app = express();

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Vaccine Management REST API Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.BASE_URL }],
  },
  apis: [`${__dirname}/routes/*.ts`, "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(routes.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(routes.ROOT, userRoutes);
app.use(routes.TOKEN, tokenRoutes);

app.use(deserializeUser);

app.delete(routes.SIGN_OUT, signOut);

app.use(routes.VACCINE, vaccineRoutes);

app.use(errorHandler);

export default app;
