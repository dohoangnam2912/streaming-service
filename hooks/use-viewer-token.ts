//The hook is being used to create the identity of the user that is trying to watch our stream
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode} from "jwt-decode"
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    console.log(name);
    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {name: string}; // reread as and &

                const name = decodedToken?.name;
                console.log(name);
                const identity = decodedToken.jti; //jti

                if (identity){
                    setIdentity(identity);
                }

                if (name) {
                    setName(name);
                }

            } catch {
                toast.error("Something went wrong")
            }
        }

        createToken();
    }, [hostIdentity]);

    return {
        name, token, identity
    }
}
