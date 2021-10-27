//@ts-check
const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function count() {
    return await db.url.count()
}

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randItem = arr => {
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

const URL = {
    async generateRandomId() {
        const id = Array.from({ length: 6 }, randomChar).join('')
        const idExists = await db.url.count({
            where: {
                id
            }
        }) !== 0

        return !idExists ? id : await this.generateRandomId()
    },
    async verify(url) {
        return await db.url.count({
            where: {
                url
            }
        }) === 0
    },
    async create(url) {
        if (! await this.verify(url)) {
            const { id } = await db.url.findFirst({
                select: {
                    id: true
                },
                where: {
                    url
                }
            })
            return id
        }

        const id = await this.generateRandomId()
        await db.url.create({
            data: {
                id, url
            }
        })

        return id
    },
    async getURL(id) {
        const { url } = await db.url.findUnique({
            select: {
                url: true
            },
            where: {
                id
            }
        })
        return url
    }
}

const controllers = {
    async create(req, res) {
        const { url } = req.body
        const id = await URL.create(url)
        res.render('index', { number: await controllers.count(), part: 'shorted', url: `${req.headers.host}/${id}`})
    },
    count,
    async getURL(req, res) {
        const { id } = req.params
        const url = await URL.getURL(id)
        res.redirect(url)
    }
}

module.exports = controllers