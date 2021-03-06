import * as path from 'path'
import * as express from 'express'
import { exec } from 'child_process'
import { router } from './routes'

const getPort = () => {
    const defaultPort = 4000
    const args = process.argv
    const portARG = args.find(arg => arg.includes('--port='))
    return Number(portARG?.split('=')?.[1]) || defaultPort
}

const server = express()
const root = process.cwd()
const port = getPort()

server.set("view engine", 'ejs')
server.set('views', path.resolve(root, 'src', 'views'))
server.use(express.json())
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(router)

server.listen(port, () => console.log(`Server Online, Port: ${port}`))

if (process.argv.includes("--dev")) {
    exec(`${process.platform === "darwin" ? 'open' : 'start'} http://localhost:${port}`)
}