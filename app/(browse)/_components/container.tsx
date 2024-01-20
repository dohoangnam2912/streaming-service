"use client"

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts"; // can check the width
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ConnectOpts } from "net";
//Reread useSidebar
interface ContainerProps {
    children: React.ReactNode;
}
export const Container = ({
    children,
}: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px");
    const { collapsed , onCollapse, onExpand} = useSidebar((state) => state);
    
    useEffect(() => {
        if (matches) { //boolean 1 or 0
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand]) //reread about the []

    return(
        <div className={cn(
            "flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>
    )
}