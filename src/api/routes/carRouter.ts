import { Router } from "express";
import * as carsController from "../controllers/carsController";
import multer from "multer";

const carRouter = Router();
const upload = multer();

carRouter.get("users", carsController.get);
carRouter.get("users/:id", carsController.getUnique);
carRouter.post("users/new", carsController.post, upload.any());
carRouter.put("users/update", carsController.update, upload.any());
carRouter.delete("users/delete", carsController.deleteCar);

export default carRouter;
