import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui";
import LoadingButton from "../loading";
import { UserFormData, UserProfileForm } from "@/forms";
import { useGetMyUser } from "@/hooks";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled?: boolean;
    isLoading?: boolean;
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const {
        isAuthenticated,
        isLoading: isAuthLoading,
        loginWithRedirect
    } = useAuth0();

    const { pathname } = useLocation();

    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            },
        });
    }

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1"
                onClick={onLogin}
            >
                Log in to check out
            </Button>
        )
    }
    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled}
                    className="bg-orange-500 flex-1"
                >
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[425px] md:min-w-[700px] bg-gray-50"
                aria-describedby="checkout-description"
            >
                <DialogTitle style={{ visibility: 'hidden' }}>Checkout Details</DialogTitle>
                <p className="text-xl text-gray-500 font-bold" id="checkout-description">
                    Confirm your delivery details and proceed to payment.
                </p>
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    title="Confirm delivery details"
                    buttonText="Continue to payment"
                />
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton;