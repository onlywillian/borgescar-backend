import express from "express";
import usersRouter from "./routes/users";
import carsRouter from "./routes/cars";
import authRouter from "./auth/authRouter";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(usersRouter);
app.use(carsRouter);
app.use(authRouter);

app.listen(8000);
