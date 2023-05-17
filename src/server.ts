import express from "express";
import usersRouter from "./routes/users";
import carsRouter from "./routes/cars";
import admsRouter from "./routes/administrator";
import authRouter from "./auth/authRouter";
import schedulingRouter from "./routes/scheduling";
import cors from "cors";

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

app.listen(8000);
