import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post('/car/new', async (req: Request, res: Response) => {
    const newCar = await prisma.car.create({
        data: req.body
    });
    
    if (!newCar) return res.json({ Error: "User is not created" }).status(500)

    return res.json({ User: newCar }).status(200)
})

export default router;