import { Router } from "express";
import * as schedulingController from "../controllers/schedulingController";

const userRouter = Router();

userRouter.get("users", schedulingController.get);
userRouter.post("users/new", schedulingController.post);
userRouter.delete("users/delete", schedulingController.deleteScheduling);

export default userRouter;
