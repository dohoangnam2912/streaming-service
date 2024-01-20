import { db } from "./db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id, //If block no render in follow
                        }
                    }
                }
            },
            //Reread about the double include and following
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true,
                            }
                        }
                    },
                }
            }
        })
        return followedUsers;
    } catch {
        return [];
    }
}

export const isFollowingUser = async (id:string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {id},
        });

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id, //User want to check the relation with
            }
        })

        return !!existingFollow;
    } catch {
        return false;
    }   
}

export const followUser = async (id:string) => {
    const self =  await getSelf();

    const otherUser = await db.user.findUnique({
        where: {id},
    });

    if (!otherUser){
        throw new Error("User not found");
    }

    if(otherUser.id === self.id) {
        throw new Error("Cannot follow yourself")
    }
    // Why using findFirst but not findUnique
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })
    //reread new
    if (existingFollow) {
        throw new Error("Already following");
    }
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            follower: true,
            following: true,
        }
    })
    //Reread how return follow
    return follow;
}
//Server actions nextjs

export const unfollowUser = async (id:string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    if(!otherUser) {
        throw new Error("User not found");
    }

    if(otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        }
    })

    if(!existingFollow) {
        throw new Error("Not following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};