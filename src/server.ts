import express from 'express';
import usersRouter from './routes/users';
import carsRouter from './routes/cars';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(usersRouter);
app.use(carsRouter);

app.listen(8000);