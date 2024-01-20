import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id:string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {id}//id:id
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id){
            return false
        }

        // const existingBlock = await db.block.findFirst({
        //     where: {
        //         blockerId: otherUser.id,
        //         blockedId: self.id,
        //     }
        // })
        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                }
            }
        })
        // findUnique will use an index on unique constraint => faster query
        // findFirst will go through all the records until it finds the matching one

        return !!existingBlock; //set return type to boolean
    } catch {
        return false;
    }
}

export const blockUser = async (id:string) => {
    //If block self
    const self = await getSelf();

    if(self.id === id) {
        throw new Error("Cannot block yourself");
    }
    //If not found 
    const otherUser = await db.user.findUnique({
        where: {id}
    });
    
    if(!otherUser) {
        throw new Error("User not found")
    }
    //If already block send Error
    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    })

    if (existingBlock) {
        throw new Error("Already blocked");
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        }
    })

    return block;
}

export const unblockUser = async (id:string) => {
    const self = await getSelf();

    if(self.id === id) {
        throw new Error("Cannot unblock yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id },
    })

    if(!otherUser) {
        throw new Error("User not found")
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {//In the PrismaSchema file, we define @@unique([blockerId, blockedId]) creates an index allow querying
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    })
    
    if(!existingBlock) {
        throw new Error("Not blocked")
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id,
        },
        include: {
            blocked: true,
        }
    })

    return unblock;
}