import { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@/constants";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


type Props = {
    children: React.ReactNode;
}

const Auth0Provider_Navigate = ({ children }: Props) => {

    const domain = AUTH0_DOMAIN;
    const clientId = AUTH0_CLIENT_ID;
    const redirectUri = AUTH0_CALLBACK_URL;
    const navigate = useNavigate();

    if (!domain || !clientId || !redirectUri) {
        throw new Error("Unable to initialize auth");
    }

    const onRedirectCallback = () => {
        navigate("/auth-callback");
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0Provider_Navigate;