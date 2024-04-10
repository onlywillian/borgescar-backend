import { Router } from "express";
import * as usersController from "../controllers/userController";

const userRouter = Router();

userRouter.get("users", usersController.get);
userRouter.get("users/:id", usersController.getUnique);
userRouter.post("users/new", usersController.post);
userRouter.put("users/update", usersController.update);
userRouter.delete("users/delete", usersController.deleteUser);

export default userRouter;
