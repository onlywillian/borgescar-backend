import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import multer from "multer";

import uploadNewImage from "../drive/createDriveFiles";
import updateFolder from "../drive/updateDriveFolder";
import updateDriveImages from "../drive/updateDriveImages";

const prisma = new PrismaClient();
const router = Router();
const upload = multer();

router.get("/cars/all", async (req: Request, res: Response) => {
  const cars = await prisma.car.findMany();

  if (cars.length === 0)
    return res.status(404).send({ Error: "Nenhhum carro encontrado" });

  return res.status(200).send({ Cars: cars });
});

router.get("/cars/:id", async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(401).send({ Error: "ID não informado" });

  const car = await prisma.car.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!car) return res.status(500).send({ Error: "Carro não criado" });

  return res.status(200).send({ Car: car });
});

router.post("/cars/new", upload.any(), async (req: Request, res: Response) => {
  const { name, description, type, price, stock } = req.body;

  const car = await prisma.car.findFirst({
    where: {
      name: name,
    },
  });

  if (car) return res.status(401).send({ Error: "Este carrro já existe" });

  const files: any = req.files;

  // const possibleDatas = ["image1", "image2", "image3", "image4"];

  const googleDriveImagesIds = await uploadNewImage(name, [
    files[0],
    files[1],
    files[2],
    files[3],
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

  if (!newCar) return res.status(500).send({ Error: "Carro não criado" });

  return res.status(200).send({ NewCar: newCar });
});

router.put("/cars/update", async (req: Request, res: Response) => {
  const { id, name, description, type, price, stock } = req.body;

  const oldCar = await prisma.car.findFirst({
    where: {
      id: id,
    },
  });

  if (!oldCar)
    return res.status(404).send({ Error: "O carro buscado não existe" });

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
      price: Number(price),
      stock: Number(stock),
    },
  });

  if (!carUpdated)
    return res.status(401).send({ Error: "Erro de atualização" });

  return res.status(200).send({ Car: carUpdated });
});

router.put(
  "/cars/updateImages",
  upload.any(),
  (req: Request, res: Response) => {
    const { carName } = req.body;

    updateDriveImages(carName, req.files);

    return res.send({ Succes: "Imagens atualizadas" });
  }
);

router.delete("/cars/remove", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) return res.status(401).send({ Error: "ID não informado" });

  const deletedCar = await prisma.car.delete({
    where: {
      id: id,
    },
  });

  if (!deletedCar)
    return res.status(500).send({ Error: "Deleção não ocorreu como esperado" });

  return res.status(200).send({ Succes: "Carro excluído com sucesso" });
});

export default router;
