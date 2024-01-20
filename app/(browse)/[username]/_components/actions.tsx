"use client";

import { onBlock , onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

//API less mutation, doenst need to create a POST route for this
export const Actions = ({isFollowing, userId}:ActionsProps) => {
    //Read about the useTransition
    const [isPending, startTransition] = useTransition();
    //Server actions
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
            //reread then. Between then and catch theres no , or ;
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            //reread then. Between then and catch theres no , or ;
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }

    const onClick = () => {
        if (isFollowing){
            handleUnfollow();
        }
        else {
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`UnBlocked the user ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        //reread about the isPending
        <>
        <Button 
            disabled={isPending} 
            onClick={onClick} 
            variant="primary">
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
            Block
        </Button>
        </>
    )
}