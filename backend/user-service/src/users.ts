import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
    const { username, email } = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        console.error(`Email: ${email}is already being used`);
        res.sendStatus(403);
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email
        }
    });


    res.json(newUser);
});

router.put('/', async (req: Request, res: Response) => {
    const { email, username } = req.body;
    if (!email || !username) {
        res.status(400).json({ message: 'Email and name are required for updating.' });
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (!existingUser) {
        res.status(404).json({ message: `User with email: ${email} not found.` });
        return;
    }

    const updateUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            username: username,
        },
    });

    res.json(updateUser);
});

router.delete('/',  async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Email is required for deletion.' });
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (!existingUser) {
        res.status(404).json({ message: `User with email: ${email} not found.` });
        return;
    }

    const deletedUser = await prisma.user.delete({
        where: {
            email: email,
        },
    });

    res.json(deletedUser);
});

export default router;