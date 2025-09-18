import express from "express";
import path from "path";

import userRoutes from "./routes/user.route.js";

const app = express();
app.use(express.json());

app.use("/images", express.static("images"));

app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running");
});
