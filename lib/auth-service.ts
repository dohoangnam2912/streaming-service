//Hold the database

import { currentUser  } from "@clerk/nextjs";

import { db } from "./db";


//getSelf is a function you always want to use when wanting to fetch an user in our own database
export const getSelf = async () => {
    //Load all the user to self
    const self = await currentUser();

    if(!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id},
    });

    if (!user) {
        throw new Error("Not found")
    }

    return user;
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username){
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: {username}
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (self.username !== user.username) {
        throw new Error("Unauthorized");
    }

    return user;
}