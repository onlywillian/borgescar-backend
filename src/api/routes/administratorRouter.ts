import { Router } from "express";
import administratorController from "../controllers/administratorController";

const administratorRouter = Router();

administratorRouter.post("/administrator/new", (req, res) =>
  new administratorController(req, res).createAdm()
);

export default administratorRouter;
