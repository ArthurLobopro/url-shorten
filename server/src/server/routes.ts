import { Router } from "express";
import { Controller } from "./Controllers/Controller";
import { URLController as URL } from "./Controllers/Url-controller";

export const router = Router({ strict: true, caseSensitive: true })

router.get("/", (req, res) => {
    console.log(req.url);

    res.render('index')
})

//Esta rota deve ser mantida acima da rota /:id
router.get("/count", URL.count)
router.get("/list", Controller.list)
router.get("/:id", Controller.getURL)

router.post("/create", URL.create)