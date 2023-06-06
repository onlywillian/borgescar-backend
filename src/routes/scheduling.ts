import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/schedules/all", async (req: Request, res: Response) => {
  const schedules = await prisma.schedules.findMany();

  if (!schedules)
    return res.send({ Error: "Scheduling not created" }).status(403);

  return res.send({ Scheduling: schedules }).status(200);
});

router.post("/schedules/new", async (req: Request, res: Response) => {
  const oldScheduling = await prisma.schedules.findFirst({
    where: {
      userName: req.body.userName,
      date: req.body.date,
    }
  })

  if (oldScheduling) return res.send({ Error: "Agendamento nessa data já existe!" }).status(400);

  const newScheduling = await prisma.schedules.create({
    data: req.body,
  });

  if (!newScheduling)
    return res.send({ Error: "Scheduling not created" }).status(403);

  return res.send({ Scheduling: newScheduling }).status(200);
});

export default router;
