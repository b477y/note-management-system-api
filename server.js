import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

bootstrap(app, express);
