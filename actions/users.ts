"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf()
    
    const validData = {
        bio: values.bio,
    }//bio doenst exist in clerk

    const user = await db.user.update({
        where: { id: self.id },
        data: {
            ...validData
        }
    })

    revalidatePath(`/${self.username}`); // The owner of the stream is going to be able to modify their from both of this route so it 
    revalidatePath(`/u/${self.username}`);

    return user;
}