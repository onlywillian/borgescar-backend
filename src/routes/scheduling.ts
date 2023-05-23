import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/schedules/new", async (req: Request, res: Response) => {
  const newScheduling = await prisma.schedules.create({
    data: req.body,
  });

  if (!newScheduling)
    return res.send({ Error: "Scheduling not created" }).status(403);

  return res.send({ Scheduling: newScheduling }).status(200);
});

export default router;
