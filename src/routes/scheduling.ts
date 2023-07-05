import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/schedules/all", async (req: Request, res: Response) => {
  const schedules = await prisma.schedules.findMany();

  if (!schedules)
    return res.status(403).send({ Error: "Scheduling not created" });

  return res.status(200).send({ Scheduling: schedules });
});

router.post("/schedules/new", async (req: Request, res: Response) => {
  const oldScheduling = await prisma.schedules.findFirst({
    where: {
      userName: req.body.userName,
      date: req.body.date,
    },
  });

  if (oldScheduling)
    return res.status(400).send({ Error: "Agendamento nessa data já existe!" });

  const newScheduling = await prisma.schedules.create({
    data: req.body,
  });

  if (!newScheduling)
    return res.status(403).send({ Error: "Erro ao criar o agendamento" });

  return res.status(200).send({ Scheduling: newScheduling });
});

router.delete("/schedules/remove", async (req: Request, res: Response) => {
  const { userName, date, id } = req.body;

  const scheduling = await prisma.schedules.findFirst({
    where: {
      userName: userName,
      date: date,
    },
  });

  if (!scheduling)
    return res.status(400).send({ Error: "Sem agendamentos nessa data" });

  const deletedScheduling = await prisma.schedules.delete({
    where: {
      id: id,
    },
  });

  if (!deletedScheduling)
    return res.status(400).send({ Error: "Algum erro ocorreu" });

  return res.status(200).send({ Success: "Agendamento cancelado com sucesso" });
});

export default router;
