import express from "express";
import usersRouter from "./api/routes/userRouter";
import carsRouter from "./api/routes/carRouter";
import admsRouter from "./api/routes/administratorRouter";
import schedulingRouter from "./api/routes/schedulingRouter";
import authRouter from "./api/routes/authRouter";
import cors from "cors";
import ErrorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(usersRouter);
app.use(carsRouter);
app.use(admsRouter);
app.use(schedulingRouter);
app.use(authRouter);

// Errors
app.use(ErrorMiddleware.errorHandler);

export default app;
