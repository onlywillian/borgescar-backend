import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/all", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  if (users.length === 0)
    return res.send({ Error: "Nenhum usuário encontrado" }).status(404);

  return res.send(users).status(200);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.send({ Error: "Usuário não encontrado" }).status(404);

  return res.send(user).status(200);
});

router.post("/users/new", async (req: Request, res: Response) => {
  if (!req.body.email)
    return res.send({ Error: "O parâmetro email não foi passado" }).status(400);

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (user) return res.send({ Error: "Este email já está em uso" }).status(401);

  const newUser = await prisma.user.create({
    data: req.body,
  });

  if (!newUser) return res.send({ Error: "Erro ao criar usuário" }).status(201);

  return res.send({ User: newUser }).status(200);
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

  return res.send(updatedUser).status(200);
});

router.delete("/users/remove", async (req: Request, res: Response) => {
  const { email } = req.body;

  const deletedUser = await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return res.send({ DeletedUser: deletedUser }).status(200);
});

export default router;
