import { API_BASE_URL } from "@/constants";
import { SearchState } from "@/pages/search-page";
import { IRestaurantSearchResponse } from "@/types";
import { useCallback } from "react";
import { useQuery } from "react-query";


export const useSearchRestaurant = (
    searchState: SearchState,
    city?: string) => {

    const createSearchRequest = useCallback(async ():
        Promise<IRestaurantSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));

        try {

            const response = await
                fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
                );

            if (!response.ok) {
                throw new Error("Failed to GET restaurant");
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Error searching restaurant:", error);
            throw error;
        }
    }, [searchState.page, searchState.searchQuery, searchState.selectedCuisines, city]);


    const { data: results, isLoading } = useQuery({
        queryKey: ["searchRestaurant", searchState],
        queryFn: createSearchRequest,
        enabled: !!city,
    })

    return { results, isLoading };
}