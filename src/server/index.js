const express = require('express')
const path = require('path')
const server = express()
const controllers = require('./db')

server.set("view engine", 'ejs')
server.set('views', path.resolve(__dirname, '../', 'views'))
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

server.get("/", async (req, res) => {
    console.log(req);
    res.render('index', { number: await controllers.count(), part: 'form'})
})
server.get("/:id", controllers.getURL)
server.post("/create", controllers.create)

server.listen(4000, () => console.log('Server Online'))