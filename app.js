import express from "express";
import authRouter from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoute.js";
import taskRouter from "./src/routes/taskRoute.js";
import sequelize from "./src/config/database.js";
import User from "./src/models/User.js";
import Task from "./src/models/Task.js";
import env from "./src/config/config.js";
const { PORT } = env;

const app = express();
app.use(express.json());
//final routes for user related operations
app.use("/user", userRouter);
//final routes for auth related operations
app.use("/auth", authRouter);
//final routes for task related operations
app.use("/task", taskRouter);
// sequelize.sync({ alter: true }).then(() => console.log("Database synced"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));