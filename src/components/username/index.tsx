import { CircleUserRound } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Separator } from "../ui";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


const UsernameMenu = () => {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex items-center px-3 font-bold text-orange-500 gap-3">
                <CircleUserRound className="text-orange-500" />
                {user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link to="/manage-restaurant"
                        className="font-bold hover:text-orange-500">
                        Manage Restaurant
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Link to="/user-profile"
                        className="font-bold hover:text-orange-500">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button variant="ghost"
                        className="flex flex-1 font-bold bg-orange-500"
                        onClick={async () => await logout({
                            logoutParams: {
                                returnTo: `${window.location.origin}`,
                            },
                        })}>
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu;