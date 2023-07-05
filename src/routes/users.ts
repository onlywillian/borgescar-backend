import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/all", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  if (users.length === 0)
    return res.send({ Error: "Nenhum usuário encontrado" }).status(404);

  return res.status(200).send(users);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).send({ Error: "Usuário não encontrado" });

  return res.status(200).send(user);
});

router.post("/users/new", async (req: Request, res: Response) => {
  if (!req.body.email)
    return res.status(400).send({ Error: "O parâmetro email não foi passado" });

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (user) return res.status(401).send({ Error: "Este email já está em uso" });

  const newUser = await prisma.user.create({
    data: req.body,
  });

  if (!newUser) return res.status(201).send({ Error: "Erro ao criar usuário" });

  return res.status(200).send({ User: newUser });
});

router.put("/users/update", async (req: Request, res: Response) => {
  const { oldEmail, newEmail, newName } = req.body;

  const updatedUser = await prisma.user.update({
    where: {
      email: oldEmail,
    },
    data: {
      email: newEmail,
      name: newName,
    },
  });

  return res.status(200).send(updatedUser);
});

router.delete("/users/remove", async (req: Request, res: Response) => {
  const { email } = req.body;

  const deletedUser = await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return res.status(200).send({ DeletedUser: deletedUser });
});

export default router;
