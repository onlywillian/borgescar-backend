import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/users/all', async (req: Request, res: Response) => {
    await prisma.$connect()

    const users = await prisma.user.findMany();

    if (!users) return res.send({ Error: "users not found" }).status(400)

    return res.json(users).status(200)
})

router.post('/users/new', async (req: Request, res: Response) => {
    const users = await prisma.user.create({
        data: req.body
    });

    return res.send({ Users: users })
})

router.put('/users/update', (req: Request, res: Response) => {

})

router.delete('/users/remove', (req: Request, res: Response) => {
    
})

export default router;