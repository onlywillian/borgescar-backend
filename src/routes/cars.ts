import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import multer from "multer";

import uploadNewImage from "../drive/createDriveFiles";
import updateFolder from "../drive/updateDriveFolder";

const prisma = new PrismaClient();
const router = Router();
const upload = multer();

router.get("/cars/all", async (req: Request, res: Response) => {
  const cars = await prisma.car.findMany();

  if (cars.length === 0)
    return res.send({ Error: "Nenhhum carro encontrado" }).status(404);

  return res.send({ Cars: cars }).status(200);
});

router.get("/cars/:id", async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.send({ Error: "ID não informado" }).status(401);

  const car = await prisma.car.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!car) return res.send({ Error: "Carro não criado" }).status(500);

  return res.send({ Car: car }).status(200);
});

router.post("/cars/new", upload.any(), async (req: Request, res: Response) => {
  const { name, description, type, price, stock } = req.body;

  const car = await prisma.car.findFirst({
    where: {
      name: name,
    },
  });

  if (car) return res.send({ Error: "Este carrro já existe" }).status(401);

  const files: any = req.files;

  const possibleDatas = ["image1", "image2", "image3", "image4"];

  const googleDriveImagesIds = await uploadNewImage(name, [
    files[possibleDatas[0]][0],
    files[possibleDatas[1]][0],
    files[possibleDatas[2]][0],
    files[possibleDatas[3]][0],
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

  if (!newCar) return res.send({ Error: "Carro não criado" }).status(500);

  return res.send({ NewCar: newCar }).status(200);
});

router.put("/cars/update", async (req: Request, res: Response) => {
  const { id, name, description, type, price, stock } = req.body;

  const oldCar = await prisma.car.findFirst({
    where: {
      id: id,
    },
  });

  if (!oldCar)
    return res.send({ Error: "O carro buscado não existe" }).status(404);

  if (oldCar.name !== name) {
    updateFolder(oldCar.name, name);
  }

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

  if (!carUpdated)
    return res.send({ Error: "Erro de atualização" }).status(401);

  return res.send({ Car: carUpdated }).status(200);
});

router.put(
  "/cars/updateImages",
  upload.any(),
  (req: Request, res: Response) => {
    console.log(req.files);

    res.send({ ok: "ok" });
  }
);

router.delete("/cars/remove", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) return res.send({ Error: "ID não informado" }).status(401);

  const deletedCar = await prisma.car.delete({
    where: {
      id: id,
    },
  });

  if (!deletedCar)
    return res.send({ Error: "Deleção não ocorreu como esperado" }).status(500);

  return res.send({ Succes: "Carro excluído com sucesso" }).status(200);
});

export default router;
