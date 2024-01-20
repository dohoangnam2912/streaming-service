"use client";

import { Participant , Track } from "livekit-client";
import { useRef, useState , useEffect} from "react";
import { useTracks } from "@livekit/components-react"; //Reread the usetrack
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
    participant: Participant;
};

export const LiveVideo = ({participant}: LiveVideoProps) => {
    //Reread the useRef
    const videoRef = useRef<HTMLVideoElement>(null); // Give them a null first value
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0); //not enough to just pass in the zero here

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;  
            videoRef.current.volume = +value * 0.01; //Reread, so the value is gonna run from 0 to 1?
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0
        setVolume(isMuted ? 50 : 0);
        // We have to fire these elements on videoref
        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }
    // So we need to call an useEffect which will only fire once cuz there's no element in the square bracket
    useEffect(() => {
        onVolumeChange(0);
    }, [])

    const toggleFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen()
            // setIsFullScreen(false)
        } else if (wrapperRef?.current) { // why do we need this wrapperRef
            wrapperRef.current.requestFullscreen();
            // setIsFullScreen(true)
        }
    }

    const handleFullScreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null; //Check if the document is fullscreen
        setIsFullScreen(isCurrentlyFullScreen); 
    }

    useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef); //reread the useEventListener

    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current)
            }
        })

    return (
        <div 
            ref={wrapperRef}
            className="relative h-full flex"
        >
            <video ref={videoRef} width="100%"/>
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl onChange={onVolumeChange} value={volume} onToggle={toggleMute}/>
                    <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullScreen}/>
                </div>
            </div>
        </div>
    )
}