import { LoadingButton } from "@/components";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingButton />
            </div>
        )
    }
    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
}


export default ProtectedRoute;