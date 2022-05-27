import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const db = new PrismaClient()

const randint = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const randItem = (arr: any[]) => {
    return arr[randint(0, arr.length - 1)]
}

function randomChar() {
    const chars = [
        [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ],
        [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        ]
    ]

    const type = randItem(chars)
    return randItem(type)
}

export class URLController {
    static async generateRandomId(): Promise<string> {
        const id = Array.from({ length: 6 }, randomChar).join('')
        const idExists = await db.url.count({
            where: {
                id
            }
        }) !== 0

        return !idExists ? id : await URLController.generateRandomId()
    }

    static async verify(url: string) {
        return await db.url.count({
            where: { url }
        }) === 0
    }

    static async create(req: Request, res: Response) {
        const { url } = req.body as { url: string }
        console.log(url);

        if (! await URLController.verify(url)) {
            const { id } = await db.url.findFirst({
                select: { id: true },
                where: { url }
            }) as { id: string }

            const count = await db.url.count()
            return res.status(200).json({ count, id })
        }

        const id = await URLController.generateRandomId()
        await db.url.create({
            data: { id, url }
        })

        const count = await db.url.count()
        res.status(200).json({ count, id })
    }

    static async getURL(id: string) {
        const searchResult = await db.url.findUnique({
            select: { url: true },
            where: { id }
        })

        if (searchResult?.url) {
            return searchResult.url
        }

        throw new Error('O id solicitado não existe')

    }

    static async count(req: Request, res: Response) {
        const count = await db.url.count()
        res.status(200).json({ count })
    }
}