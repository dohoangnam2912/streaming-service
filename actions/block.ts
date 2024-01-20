"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
//How to debug: Wrap the whole function in try catch

export const onBlock = async (id:string) => {
    //Adapt to disconnect from livestream
    //Allow ability to kick the guest
    const blockedUser = await blockUser(id);

    revalidatePath("/")

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser; 
}

export const onUnblock = async (id:string) => {
    const unBlockedUser = await unblockUser(id);

    revalidatePath("/")

    if (unBlockedUser) {
        revalidatePath(`/${unBlockedUser.blocked.username}`);
    }

    return unBlockedUser;
}