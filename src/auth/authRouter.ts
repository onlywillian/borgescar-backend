import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";

const prisma = new PrismaClient();

const router = Router();

router.post(
  "/auth/login",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (!user) return res.send({ Error: "User not found" }).status(200);

    return res
      .send({ User: { name: user.name, email: user.email } })
      .status(200);
  }
);

router.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Verifing if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) return res.send({ Error: "User alreads exists" }).status(401);

  // Creating a new User
  const newUser: any = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  if (!newUser) return res.send({ Error: "Erro ao criar usuário" }).status(500);

  // Secret key from .env file
  const SECRET_KEY = <Secret>process.env.SECRET;

  // Creating jwt token
  const token = jwt.sign(
    {
      id: newUser?.id,
    },
    SECRET_KEY,
    {
      expiresIn: "2 days",
    }
  );

  return res
    .send({
      User: { id: newUser.id, name: newUser.name },
      token: token,
    })
    .status(200);
});

export default router;
