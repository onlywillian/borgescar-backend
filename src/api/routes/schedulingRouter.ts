import { Router } from "express";
import schedulingController from "../controllers/schedulingController";

const userRouter = Router();

userRouter.get("/scheduling", (req, res) =>
  new schedulingController(req, res).getAllSchedules()
);
userRouter.post("/scheduling/new", (req, res) =>
  new schedulingController(req, res).getScheduleById()
);
userRouter.delete("/scheduling/delete", (req, res) =>
  new schedulingController(req, res).deleteSchedule()
);

export default userRouter;
