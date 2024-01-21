"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
}

export const AboutCard = ({hostIdentity,hostName,viewerIdentity,bio,followedByCount}: AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer
    
    const followedByLabel = "フォロワー";
    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        {hostName}さんについて
                        <VerifiedMark/>
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio}/>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{followedByCount}</span> {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio || "このユーザーは自分についての謎めいた雰囲気を好んでいます。"}
                </p>
            </div>
        </div>
    )
}