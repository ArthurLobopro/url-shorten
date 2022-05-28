import { Router } from "express";
import { resolve } from "path";
import { Controller } from "./Controllers/Controller";
import { URLController as URL } from "./Controllers/Url-controller";

export const router = Router({ strict: true, caseSensitive: true })

const root = process.cwd()

router.get("/", (req, res) => {
    res.sendFile('index.html')
})

//Esta rota deve ser mantida acima da rota /:id
router.get("/count", URL.count)
router.get("/list", (req, res) => res.sendFile(resolve(root, "../build/index.html")))
router.post("/list", Controller.list)
router.get("/:id", Controller.getURL)

router.post("/create", URL.create)