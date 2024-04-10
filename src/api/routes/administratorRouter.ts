import { Router } from "express";
import * as administratorController from "../controllers/AdministratorController";

const userRouter = Router();

userRouter.post("users/new", administratorController.post);

export default userRouter;
