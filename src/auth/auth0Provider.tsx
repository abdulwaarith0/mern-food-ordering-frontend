import { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@/constants";
import { useCreateMyUser } from "@/hooks";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";


type Props = {
    children: React.ReactNode;
}

const Auth0Provider_Navigate = ({ children }: Props) => {
    const { createUser } = useCreateMyUser();

    const domain = AUTH0_DOMAIN;
    const clientId = AUTH0_CLIENT_ID;
    const redirectUri = AUTH0_CALLBACK_URL;

    if (!domain || !clientId || !redirectUri) {
        throw new Error("Unable to initialize auth");
    }

    const onRedirectCallback = (_appState?: AppState, user?: User) => {
        console.log("User", user);
        if (user?.sub && user?.email && user?.name) {
            createUser({
                auth0Id: user.sub,
                email: user.email,
                name: user.name,
                addressLine1: "",
                city: "",
                country: ""
            });
        }
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