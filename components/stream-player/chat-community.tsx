"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({hostName, viewerName,isHidden}: ChatCommunityProps) => {
    const participants = useParticipants(); //reread livekit, it has context from live kit room component from stream player index file
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);//reread debounce and we can add <string>, why?
    //Every half a second will go to filter through participants

    const onChange = (newValue: string) => {
        setValue(newValue);
    }
    // reread this whole function
    const filteredParticipants = useMemo(() => { //Acc = Accumulator
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        },[] as (RemoteParticipant | LocalParticipant)[])
        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        })
    }, [participants, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                コミュニティが無効しています
                </p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input onChange={(e) => onChange(e.target.value)} placeholder="Search community" className=""/>
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                結果がありません
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem key={participant.identity} hostName={hostName} viewerName={viewerName} participantName={participant.name} participantIdentity={participant.identity}/>
                ))}
            </ScrollArea>
        </div>
        )
}
