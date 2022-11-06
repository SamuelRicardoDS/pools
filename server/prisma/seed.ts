import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.create({
        data: {
            name:'samucao',
            email:'samucao@gmail',
            avatarUrl:'https://github.com/SamuelRicardoDS.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'example',
            code: 'BOL123',
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-06T15:20:41.317Z',
            firstTeamCountryCode: 'DE',
            secondTeamCOuntryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-07T15:20:41.317Z',
            firstTeamCountryCode: 'AR',
            secondTeamCOuntryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()