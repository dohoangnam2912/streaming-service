import { getSelf } from "./auth-service";
import { db } from "./db";
//Change in the direction
export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    let userId;

    try {
        const self = await getSelf();
        userId = self.id
    } catch {
        userId = null
    }

    let users = [];

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId, //Reread NOT and Where, findMany
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: { //reread some
                                    followerId: userId
                                }
                            }
                        }
                    },{
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId //Check if block then no render in the recommen
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                stream: {
                    select: {
                        isLive: true,
                    }
                },
            },
            orderBy:{
                createdAt: "desc"
            }
        })
    } else {
        users = await db.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true, //reread the select
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
        });

    }
//Error 1: We passed the whole data to the client component

    return users;
}