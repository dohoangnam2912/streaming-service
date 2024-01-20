import { Logo } from "./_components/logo";

const AuthLayout = ({children}: {children: React.ReactNode;}) => {
    //center page: h-full flex items-center justify-center
    return (
        <div className="h-full flex-col flex items-center justify-center space-y-6"> 
            <Logo/>
            {children}
        </div>
    )
}

export default AuthLayout;