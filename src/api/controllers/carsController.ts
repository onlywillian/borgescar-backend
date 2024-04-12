import { Request, Response } from "express";

import updateDriveImages from "../../drive/updateDriveImages";
import carSerivice from "../../services/carService";
import ICar from "../../interfaces/carInterface";

export default class carsController {
  private req: Request;
  private res: Response;
  private carSerivice: carSerivice;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.carSerivice = new carSerivice();
  }

  public async getAllCars() {
    const cars = await this.carSerivice.getAllCars();

    return this.res.status(200).send({ cars });
  }

  public async getCarById() {
    const { id } = this.req.params;

    const car = await this.carSerivice.getCarById(id);

    return this.res.status(200).send({ car });
  }

  public async createCar() {
    const carData: ICar = { ...this.req.body };

    const files: any = this.req.files;

    const newCar = await this.carSerivice.createCar(carData, files);

    return this.res.status(200).send({ newCar });
  }

  public async updateCar() {
    const carData: ICar = { ...this.req.body };

    const updatedCar = await this.carSerivice.updateCarById(
      carData.id,
      carData
    );

    return this.res.status(200).send({ updatedCar });
  }

  updateImages = (req: Request, res: Response) => {
    const { carName } = req.body;

    updateDriveImages(carName, req.files);

    return res.send({ Succes: "Imagens atualizadas" });
  };

  public async deleteCar() {
    const { id } = this.req.body;

    const deletedCar = await this.carSerivice.deleteCarById(id);

    return this.res.status(200).send({ deletedCar });
  }
}
