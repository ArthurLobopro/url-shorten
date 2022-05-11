import { Router } from "express";
import { Controller } from "./Controllers/Controller";
import { URL } from "./Controllers/Url-controller";

export const router = Router({ strict: true, caseSensitive: true })

router.get("/", async (req, res) => {
    res.render('index', { number: await URL.count(), part: 'form' })
})

//Esta rota deve ser mantida acima da rota /:id
router.get("/list", Controller.list)
router.get("/:id", Controller.getURL)

router.post("/create", Controller.create)