import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation"; //navigation
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: { username: string }; //Server component by default and inside dynamic folder name 
    children: React.ReactNode; //Layout have to import the children
}

const CreatorLayout = async ({params, children}: CreatorLayoutProps) => {
    const self = await getSelfByUsername(params.username);

    if(!self) {
        redirect("/")
    }

    return (
        //Different way to solve the sidebar is to add container
        <>
        <Navbar/>
        <div className="flex h-full pt-20">
            <Sidebar />
            <Container>
                {children}
            </Container>
        </div>
        </>
    )
}

export default CreatorLayout;