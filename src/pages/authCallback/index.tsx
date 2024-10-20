import { useCreateMyUser } from "@/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallback = () => {
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const navigate = useNavigate();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub &&
            user?.email &&
            user?.name &&
            !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email,
                name: user.name,
                addressLine1: "",
                city: "",
                country: ""
            });
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [user, createUser, navigate]);

    return <>Loading...</>;
};

export default AuthCallback;