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

  if (adm) return res.send({ Error: "Administrador já existe" }).status(401);

  const newAdm = await prisma.administrador.create({
    data: req.body,
  });

  if (!newAdm) return res.send({ Error: "Erro ao criar o Administrador" }).status(201);

  return res.send({ Adm: newAdm }).status(200);
});

export default router;
