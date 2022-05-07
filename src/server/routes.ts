import { Router } from "express";
import { Controller } from "./Controllers/Controller";
import { URL } from "./Controllers/Url-controller";

export const router = Router()

router.get("/", async (req, res) => {
    res.render('index', { number: await URL.count(), part: 'form' })
})
router.get("/:id", Controller.getURL)
router.post("/create", Controller.create)