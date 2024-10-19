import { CircleUserRound, Menu } from "lucide-react";
import { Button, Separator, Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui";
import { useAuth0 } from "@auth0/auth0-react";
import { MobileNavLinks } from "..";


const MobileNav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (<span
                        className="font-bold text-orange-500 flex gap-2">
                        <CircleUserRound />
                        Welcome, {user?.name}!
                    </span>
                    ) : (
                        <span>Welcome to MernEats.com!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? ( <MobileNavLinks />
                    ) : (
                        <Button className="flex-1 font-bold bg-orange-500"
                            onClick={async () => await
                                loginWithRedirect()}>
                            Log In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}


export default MobileNav;