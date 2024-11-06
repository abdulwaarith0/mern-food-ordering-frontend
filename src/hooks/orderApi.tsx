import { API_BASE_URL } from "@/constants";
import { ICheckoutSession } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";


export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createCheckoutSessionRequest = useCallback(async (
        checkoutSessionRequest: ICheckoutSession) => {

        const accessToken = await getAccessTokenSilently();

        const response = await
            fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutSessionRequest),
            });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message ||
                "Failed to create checkout session");
        }

        const data = await response.json();
        return data;
    }, []);

    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset
    } = useMutation({
        mutationFn: createCheckoutSessionRequest,
    });

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return { createCheckoutSession, isLoading };
}