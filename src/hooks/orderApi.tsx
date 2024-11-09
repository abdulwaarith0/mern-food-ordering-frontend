import { API_BASE_URL } from "@/constants";
import { ICheckoutSession, Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyOrdersRequest = useCallback(
        async (): Promise<Order[]> => {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/order`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to get orders");
            }

            const data = await response.json();
            return data;
        }, []);


    const { data: orders, isLoading } = useQuery({
        queryKey: ["my-orders"],
        queryFn: getMyOrdersRequest,
        refetchInterval: 5000,
    });

    return { orders, isLoading };
};



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