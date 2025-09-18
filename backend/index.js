import express from "express";

import userRoutes from "./routes/user.route.js";

const app = express();

app.use("users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running");
});
