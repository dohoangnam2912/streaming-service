"use client";

import { Volume1 , Volume2 , VolumeX } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
    onToggle: () => void;
    onChange: (value: number) => void;
    value: number;
}

export const VolumeControl = ({onChange,onToggle,value}:VolumeControlProps) => {
    const isMuted = value === 0;
    const isAboveHalf = value > 0;

    let Icon = Volume1;

    if(isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0])   
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
                    <Icon className="h-6 w-6"></Icon>
                </button>
            </Hint>
            <Slider
                className="w-[8rem] cursor-pointer"
                onValueChange={handleChange}
                value={[value]} //why the []
                max={100}
                step={1}
            />
        </div>
    )
}