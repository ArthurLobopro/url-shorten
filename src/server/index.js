const express = require('express')
const path = require('path')
const server = express()
const controllers = require('./db')

server.set("view engine", 'ejs')
server.set('views', path.resolve(__dirname, '../', 'views'))
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

server.get("/", async (req, res) => {
    res.render('index', { number: await controllers.count(), part: 'form' })
})
server.get("/:id", controllers.getURL)
server.post("/create", controllers.create)

const getPort = () => {
    const defaultPort = 4000
    const args = process.argv
    const portARG = args.find(arg => arg.includes('--port='))
    return Number(portARG?.split('=')?.[1]) || defaultPort
}

const port = getPort()

server.listen(port, () => console.log(`Server Online, Port: ${port}`))

if (process.argv.includes("--dev")) {
    const childProcess = require("child_process")
    childProcess.exec(`${process.platform === "darwin" ? 'open' : 'start'} http://localhost:${port}`)
}