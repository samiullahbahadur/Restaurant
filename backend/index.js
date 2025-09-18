import express from "express";

import userRoutes from "./routes/user.route.js";

const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running");
});
