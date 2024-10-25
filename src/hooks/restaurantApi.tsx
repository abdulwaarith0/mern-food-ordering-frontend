import { API_BASE_URL } from "@/constants";
import { IRestaurantSearchResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useQuery } from "react-query";


export const useSearchRestaurant = (city?: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const createSearchRequest = useCallback(async (): Promise<IRestaurantSearchResponse> => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to GET restaurant");
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Error searching restaurant:", error);
            throw error;
        }
    }, [getAccessTokenSilently]);

    const { data: results, isLoading } = useQuery({
        queryKey: ["searchRestaurant", city],
        queryFn: createSearchRequest,
        enabled: !!city,
    })

    return { results, isLoading };
}