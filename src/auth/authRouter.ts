import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const router = Router();

// Secret key from .env file
const SECRET_KEY = <Secret>process.env.SECRET;

router.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) return res.send({ Error: "User not found" }).status(200);

  // Check if password exist
  const comparePassword = await bcrypt.compare(password, user.password);

  console.log(comparePassword);

  if (!comparePassword)
    return res.send({ Error: "Wrong password" }).status(401);

  // Creating jwt token
  const token = jwt.sign(
    {
      id: user?.id,
    },
    SECRET_KEY,
    {
      expiresIn: "2 days",
    }
  );

  return res
    .send({ User: { name: user.name, email: user.email }, token: token })
    .status(200);
});

router.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Verifing if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) return res.send({ Error: "User alreads exists" }).status(401);

  // Encrypting password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Creating a new User
  const newUser: any = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });

  if (!newUser) return res.send({ Error: "Erro ao criar usuário" }).status(500);

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
