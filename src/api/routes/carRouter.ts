import { Router } from "express";
import carsController from "../controllers/carsController";
import multer from "multer";

const carRouter = Router();
const upload = multer();

carRouter.get("/cars", (req, res) => new carsController(req, res).getAllCars());
carRouter.get("/cars/:id", (req, res) =>
  new carsController(req, res).getCarById()
);
carRouter.post("/cars/new", (req, res) =>
  new carsController(req, res).createCar()
);
carRouter.put("/cars/update", (req, res) =>
  new carsController(req, res).updateCar()
);
carRouter.delete("/cars/delete", (req, res) =>
  new carsController(req, res).deleteCar()
);

export default carRouter;
