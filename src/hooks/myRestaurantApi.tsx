import { API_BASE_URL } from "@/constants";
import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Create a new restaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest =
    async (restaurantFormData: FormData): Promise<Restaurant> => {

      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: restaurantFormData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create restaurant");
        }

        const data = await response.json();
        console.log("data", data);
        return data;

      } catch (error) {
        console.error("Error creating my restaurant:", error);
        throw error;
      }
    }

  const { mutate: createRestaurant,
    isLoading,
    error,
    isSuccess
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant created!");
  } else if (error) {
    toast.error("Failed to create restaurant");
  }

  return { createRestaurant, isLoading };
}


// Get current user's restaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get restaurant");
      }

      const result = await response.json();
      return result.data;

    } catch (error) {
      console.error("Error getting my restaurant:", error);
      throw error;
    }
  }

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  if (error) {
    toast.error("Failed to load restaurant");
  }

  return { restaurant, isLoading };
}