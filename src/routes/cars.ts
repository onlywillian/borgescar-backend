import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import multer from "multer";

import uploadNewImage from "../drive/createDriveFiles";

const prisma = new PrismaClient();
const router = Router();
const upload = multer();

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

router.post(
  "/cars/new",
  upload.fields([{ name: "image1" }, { name: "image2" }, { name: "image3" }]),
  async (req: Request, res: Response) => {
    const { name, description, type, price, stock } = req.body;

    const car = await prisma.car.findFirst({
      where: {
        name: name,
      },
    });

    if (car) return res.send({ Error: "Car alreads exists" }).status(401);

    const files: any = req.files;

    const possibleDatas = ["image1", "image2", "image3"];

    const googleDriveImagesIds = await uploadNewImage(name, [
      files[possibleDatas[0]][0],
      files[possibleDatas[1]][0],
      files[possibleDatas[2]][0],
    ]);

    const imagesLink = googleDriveImagesIds.map(
      (id) => `https://drive.google.com/uc?export=view&id=${id}`
    );

    const newCar = await prisma.car.create({
      data: {
        name: name,
        description: description,
        type: type,
        price: Number(price),
        stock: Number(stock),
        image_links: imagesLink,
        audio_link: "",
      },
    });

    if (!newCar) return res.send({ Error: "Car is not created" }).status(500);

    return res.send({ NewCar: newCar }).status(200);
  }
);

router.put("/cars/update", async (req: Request, res: Response) => {
  const { id, name, description, type, price, stock } = req.body;

  const oldCar = await prisma.car.findFirst({
    where: {
      id: id,
    },
  });

  if (!oldCar) return res.send({ Error: "" }).status(404);

  const carUpdated = await prisma.car.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      type: type,
      price: price,
      stock: stock,
    },
  });

  if (!carUpdated) return res.send({ Error: "Update error" }).status(401);

  return res.send({ Car: carUpdated }).status(200);
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
