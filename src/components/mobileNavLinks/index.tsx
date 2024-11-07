import { Link } from "react-router-dom";
import { Button, Separator } from "../ui";
import { useAuth0 } from "@auth0/auth0-react";


const MobileNavLinks = () => {
    const { logout } = useAuth0();

    return (
        <>
            <Link to="/order-status"
                className="flex bg-white items-center font-bold hover:text-orange-500">
                Order Status
            </Link>
            <Separator />
            <Link to="/manage-restaurant"
                className="flex bg-white items-center font-bold hover:text-orange-500">
                Manage Restaurant
            </Link>
            <Separator />
            <Link to="/user-profile"
                className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
            </Link>
            <Separator />

            <Button
                className="flex items-center px-3 font-bold hover:bg-gray-500"
                onClick={async () => await
                    logout()}>
                Log Out
            </Button>
        </>
    )
}

export default MobileNavLinks;