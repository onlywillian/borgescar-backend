import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/schedules/new", async (req: Request, res: Response) => {
  const newScheduling = prisma.schedules.create({
    data: req.body
  });

  return res.send({ Scheduling: newScheduling }).status(200);
});

export default router;