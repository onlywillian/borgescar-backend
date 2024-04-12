import uploadNewImage from "../drive/createDriveFiles";
import updateFolder from "../drive/updateDriveFolder";
import ICar from "../interfaces/carInterface";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TFiles =
  | Express.Multer.File[]
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | undefined;

export default class carSerivice {
  public async getAllCars() {
    const cars = await prisma.car.findMany();

    return cars;
  }

  public async getCarById(id: string) {
    const car = await prisma.car.findFirst({
      where: {
        id: id,
      },
    });

    return car;
  }

  public async createCar(carData: ICar, files: any) {
    const googleDriveImagesIds = await uploadNewImage(carData.name, [
      files[0],
      files[1],
      files[2],
      files[3],
    ]);

    const imagesLink = googleDriveImagesIds.map(
      (id) => `https://drive.google.com/uc?export=view&id=${id}`
    );

    carData.image_links = imagesLink;

    const newCar = await prisma.car.create({
      data: carData,
    });

    return newCar;
  }

  public async updateCarById(id: string, car: ICar) {
    const oldCar = await prisma.car.findFirst({
      where: {
        id: car.id,
      },
    });

    if (oldCar!.name !== car.name) {
      updateFolder(oldCar!.name, car.name);
    }

    const updatedCar = await prisma.car.update({
      where: {
        id: id,
      },
      data: car,
    });

    return updatedCar;
  }

  public async deleteCarById(id: string) {
    const deletedCar = await prisma.car.delete({
      where: {
        id: id,
      },
    });

    return deletedCar;
  }
}
