import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { URL } from "./Url-controller"

const db = new PrismaClient()

export class Controller {
    static async create(req: Request, res: Response) {
        const { url } = req.body as { url: string }
        const id = await URL.create(url.trim())
        const number = await URL.count()
        res.render('index', { number, part: 'shorted', url: `${req.headers.host}/${id}` })
    }

    static async getURL(req: Request, res: Response) {
        const { id } = req.params as { id: string }
        try {
            const url = await URL.getURL(id.trim())
            res.redirect(url)
        } catch (error) {
            res.redirect('/')
        }
    }
}