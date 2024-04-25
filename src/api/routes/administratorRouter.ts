import { Router } from "express";
import administratorController from "../controllers/administratorController";

const administratorRouter = Router();

administratorRouter.get("/administrators", (req, res) =>
  new administratorController(req, res).getAdmById()
);
administratorRouter.post("/administrators/new", (req, res) =>
  new administratorController(req, res).createAdm()
);

export default administratorRouter;
