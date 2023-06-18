import express from "express";
import usersRouter from "./routes/users";
import carsRouter from "./routes/cars";
import admsRouter from "./routes/administrator";
// Auth
import usersAuth from "./auth/usersAuth";
import administratorAuth from "./auth/administratorAuth";
import schedulingRouter from "./routes/scheduling";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Routes
app.use(usersRouter);
app.use(carsRouter);
app.use(admsRouter);
app.use(schedulingRouter);
// Auth
app.use(usersAuth);
app.use(administratorAuth);

app.listen(8000);
