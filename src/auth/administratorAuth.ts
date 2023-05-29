import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const router = Router();

// Secret key from .env file
const SECRET_KEY = <Secret>process.env.SECRET;

router.post("/adm/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adm = await prisma.administrador.findFirst({
    where: {
      email: email,
    },
  });

  if (!adm) return res.send({ Error: "adm not found" }).status(200);

  // Check if password exist
  const comparePassword = await bcrypt.compare(password, adm.password);

  if (!comparePassword)
    return res.send({ Error: "Wrong password" }).status(401);

  // Creating jwt token
  const token = jwt.sign(
    {
      id: adm?.id,
      name: adm?.name,
      email: adm?.email,
      password: adm?.password,
    },
    SECRET_KEY,
    {
      expiresIn: "2 days",
    }
  );

  return res
    .send({ Adm: { name: adm.name, email: adm.email }, token: token })
    .status(200);
});

router.post("/adm/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Verifing if adm exists
  const adm = await prisma.administrador.findUnique({
    where: {
      email: email,
    },
  });

  if (adm) return res.send({ Error: "adm alreads exists" }).status(401);

  // Encrypting password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Creating a new adm
  const newadm: any = await prisma.administrador.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });

  if (!newadm) return res.send({ Error: "Erro ao criar usuário" }).status(500);

  // Creating jwt token
  const token = jwt.sign(
    {
      id: newadm?.id,
    },
    SECRET_KEY,
    {
      expiresIn: "2 days",
    }
  );

  return res
    .send({
      Adm: { id: newadm.id, name: newadm.name },
      token: token,
    })
    .status(200);
});

export default router;
