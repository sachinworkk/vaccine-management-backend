import dotenv from "dotenv";

import express from "express";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server listening on port"));
