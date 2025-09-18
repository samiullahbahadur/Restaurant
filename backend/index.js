import express from "express";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";

const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.listen(5000, () => {
  console.log("Server is running");
});
