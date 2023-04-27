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

router.get("/cars/:id", async (req: Request, res: Response) => {
  if (!req.params.id) return res.send({ Error: "Id not provided" }).status(401);

  const car = await prisma.car.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!car) return res.send({ Error: "Car is not created" }).status(500);

  return res.send({ Car: car }).status(200);
});

router.post("/car/new", async (req: Request, res: Response) => {
  const newCar = await prisma.car.create({
    data: req.body,
  });

  if (!newCar) return res.send({ Error: "Car is not created" }).status(500);

  return res.send({ NewCar: newCar }).status(200);
});

router.delete("/cars/remove", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) return res.send({ Error: "Id not provided" }).status(401);

  const deletedCar = await prisma.car.delete({
    where: {
      id: id,
    },
  });

  if (!deletedCar)
    return res.send({ Error: "Some error has ocurred" }).status(500);

  return res.send({ Succes: "Car sucesfully deleted" }).status(200);
});

export default router;
