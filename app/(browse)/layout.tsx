import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Suspense } from "react";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    //Reread Suspense fallback
    //This skeleton will show while this getRecommended: Diffrent skeleton with wrapper skeleton
    return (
        <div>
            <Navbar/>
            <div className="flex h-full pt-20">
                <Suspense fallback={<SidebarSkeleton/>}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
};

export default BrowseLayout;