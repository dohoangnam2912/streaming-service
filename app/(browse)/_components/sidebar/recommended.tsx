"use client"
import { useSidebar } from "@/store/use-sidebar"
// Cuz we need to use Reactjs, use state...

import { User } from "@prisma/client"

import { UserItem, UserItemSkeleton } from "./user-item";
// Make a relation between 2 models
interface RecommendedProps {
    data: (User & {
        stream: { isLive: boolean} | null;
    })[],
    //data stream
}
//Fatal error: We made stream data visible to the client server 
export const Recommended = ({data}: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);

    console.log(data.length);

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Recommended
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem  key={user.id} username={user.username} imageUrl={user.imageUrl} isLive={user.stream?.isLive}/>
                ))}
            </ul>
        </div>
    )
}
//REREAD ...Array and map(_,i)
export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_,i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}