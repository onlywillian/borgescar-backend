import express from "express";
import usersRouter from "./api/routes/userRouter";
import carsRouter from "./api/routes/carRouter";
import admsRouter from "./auth/administratorAuth";
// Auth
import usersAuth from "./auth/usersAuth";
import administratorAuth from "./auth/administratorAuth";
import schedulingRouter from "./api/routes/schedulingRouter";
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

// Errors
app.use(ErrorMiddleware.errorHandler);

// Auth
app.use(usersAuth);
app.use(administratorAuth);

export default app;
