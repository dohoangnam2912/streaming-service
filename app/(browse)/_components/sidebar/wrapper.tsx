"use client";

// Doesn't mean skip server side rendering, it means it's a client component. you gonna do server side rendering in here, but it's not a server component
// Server components and Server renderign are two different things
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
    children: React.ReactNode;
};
//children: make inside a server component?
//zustand?
//aside tag?
export const Wrapper = ({
    children,
}: WrapperProps) => {
    //Server doesn't know about below line, only client does, then we used collapsed && behind
    // const [isClient, setIsClient] = useState(false); 
    const { collapsed } = useSidebar((state) => state);
    //Client can't use effect hook
    // useEffect(() => {
    //     setIsClient(true);
    // }, [])
    const isClient = useIsClient();
    // Used for base components: Take care of server side rendering
    if (!isClient) return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton/>
            <FollowingSkeleton/>
            <RecommendedSkeleton/>
        </aside>
    );

    return (
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50", collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}
//ONLY RENDER IN THE CLIENT SERVER, THEY GONNA RENDER THE SKELETON INSTEAD