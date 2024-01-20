"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomName } from "@livekit/components-react";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
//How to debug: Wrap the whole function in try catch

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id:string) => {
    const self = await getSelf();
    //Adapt to disconnect from livestream
    //Allow ability to kick the guest
    let blockedUser;

    try {
        blockedUser = await blockUser(id);
    } catch {
        // This means user is a guest
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch {
        // This means user is not in the room

    }
    revalidatePath(`/u/${self.username}/community`)

    return blockedUser; 
}

export const onUnblock = async (id:string) => {
    const self = await getSelf();
    const unBlockedUser = await unblockUser(id);

    revalidatePath(`/u/${self.username}/community`)

    // if (unBlockedUser) {
    //     revalidatePath(`/${unBlockedUser.blocked.username}`);
    // }

    return unBlockedUser;
}