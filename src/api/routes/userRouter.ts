import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", (req, res) =>
  new UserController(req, res).getAllUsers()
);
userRouter.get("/users/:id", (req, res) =>
  new UserController(req, res).getUniqueUser()
);
userRouter.post("/users/new", (req, res) =>
  new UserController(req, res).createUser()
);
userRouter.put("/users/update", (req, res) =>
  new UserController(req, res).updateUser()
);
userRouter.delete("/users/delete", (req, res) =>
  new UserController(req, res).deleteUser()
);

export default userRouter;
