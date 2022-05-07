import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

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

export class URL {
    static async generateRandomId() {
        const id = Array.from({ length: 6 }, randomChar).join('')
        const idExists = await db.url.count({
            where: {
                id
            }
        }) !== 0

        return !idExists ? id : await this.generateRandomId()
    }

    static async verify(url: string) {
        return await db.url.count({
            where: {
                url
            }
        }) === 0
    }

    static async create(url: string) {
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
    }

    static async getURL(id: string) {
        const searchResult = await db.url.findUnique({
            select: {
                url: true
            },
            where: {
                id
            }
        })

        if (searchResult.url) {
            return searchResult.url
        }

        throw new Error('O id solicitado não existe')

    }

    static async count() {
        return await db.url.count()
    }
}