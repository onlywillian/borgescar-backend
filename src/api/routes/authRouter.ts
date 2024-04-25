import { Router } from "express";

import administratorAuthController from "../controllers/administratorAuthController";
import userAuthController from "../controllers/userAuthController";

const authRouter = Router();

authRouter.post("/users/login", (req, res, next) =>
  new userAuthController(req, res, next).userLogin()
);
authRouter.post("/users/register", (req, res, next) =>
  new userAuthController(req, res, next).userRegister()
);
authRouter.post("/administrator/login", (req, res, next) =>
  new administratorAuthController(req, res, next).administratorLogin()
);
authRouter.post("/administrator/register", (req, res, next) =>
  new administratorAuthController(req, res, next).administratorRegister()
);

export default authRouter;
