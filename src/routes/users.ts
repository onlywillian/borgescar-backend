import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/users/all', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    if (!users) return res.json({ Error: "users not found" }).status(400)

    return res.json(users).status(200)
})

router.post('/users/new', async (req: Request, res: Response) => {
    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if (user) return res.json({ Error: "Email alreads in use" }).status(401)

    const newUser = await prisma.user.create({
        data: req.body
    });
    
    if (!newUser) return res.json({ Error: "User is not created" }).status(500)

    return res.json({ User: newUser }).status(200)
})

router.put('/users/update', async (req: Request, res: Response) => {
    const { oldEmail, newEmail } = req.body

    const updatedUser = await prisma.user.update({
        where: {
            email: oldEmail
        },
        data: {
            email: newEmail
        }
    })

    return res.json(updatedUser).status(200)
})

router.delete('/users/remove', async (req: Request, res: Response) => {
    const { email } = req.body

    const deletedUser = await prisma.user.delete({
        where: {
            email: email
        }
    })

    return res.json({ DeletedUser: deletedUser }).status(200)
})

export default router;