import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { URLController as URL } from "./Url-controller"

const db = new PrismaClient()

export class Controller {

    static async getURL(req: Request, res: Response) {
        const { id } = req.params as { id: string }
        try {
            const url = await URL.getURL(id.trim())
            res.redirect(url)
        } catch (error) {
            res.redirect('/')
        }
    }

    static async list(req: Request, res: Response) {
        const result = await db.url.findMany()
        res.json(result)
    }
}