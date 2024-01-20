"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

//Ensure the security this actually behaves like an API route and doesn't spill into some JS bundle

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        
        return followedUser;
    } catch {
        throw new Error("Internal Error")
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath("/")

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser?.following?.username}`)
        }

        return unfollowedUser;
    } catch {
        throw new Error("Internal Error")
    }
}