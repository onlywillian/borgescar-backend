import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get('/cars/all', async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany()

    if (cars.length === 0) return res.send({ Error: 'User not found' }).status(404)

    return res.send({ Cars: cars }).status(200)
})

router.post('/cars/new', async (req: Request, res: Response) => {
    const newCar = await prisma.car.create({
        data: req.body
    });
    
    if (!newCar) return res.json({ Error: "User is not created" }).status(500)

    return res.json({ User: newCar }).status(200)
})

export default router;