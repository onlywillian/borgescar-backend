import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/adms/new", async (req: Request, res: Response) => {
  const adm = await prisma.administrador.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (adm) return res.status(401).send({ Error: "Administrador já existe" });

  const newAdm = await prisma.administrador.create({
    data: req.body,
  });

  if (!newAdm)
    return res.status(201).send({ Error: "Erro ao criar o Administrador" });

  return res.status(200).send({ Adm: newAdm });
});

export default router;
