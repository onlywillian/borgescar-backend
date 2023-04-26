import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/cars/all", async (req: Request, res: Response) => {
  const cars = await prisma.car.findMany();

  if (cars.length === 0)
    return res.send({ Error: "No cars found" }).status(404);

  return res.send({ Cars: cars }).status(200);
});

router.post("/cars/find", async (req: Request, res: Response) => {
  if (!req.body.id) return res.send({ Error: "Id not provided" }).status(401);

  const car = await prisma.car.findFirst({
    where: {
      id: req.body.id,
    },
  });

  if (!car) return res.json({ Error: "Car is not created" }).status(500);

  return res.json({ Car: car }).status(200);
});

router.post("/car/new", async (req: Request, res: Response) => {
  const newCar = await prisma.car.create({
    data: req.body,
  });

  if (!newCar) return res.json({ Error: "Car is not created" }).status(500);

  return res.json({ NewCar: newCar }).status(200);
});

export default router;
