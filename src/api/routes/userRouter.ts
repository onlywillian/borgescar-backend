import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", (req, res, next) =>
  new UserController(req, res, next).getAllUsers()
);
userRouter.get("/users/:id", (req, res, next) =>
  new UserController(req, res, next).getUniqueUser()
);
userRouter.post("/users/new", (req, res, next) =>
  new UserController(req, res, next).createUser()
);
userRouter.put("/users/update", (req, res, next) =>
  new UserController(req, res, next).updateUser()
);
userRouter.delete("/users/delete", (req, res, next) =>
  new UserController(req, res, next).deleteUser()
);

export default userRouter;
