import { API_BASE_URL } from "@/constants";
import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";


// Create a new restaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createMyRestaurantRequest = useCallback(async (restaurantFormData: FormData): Promise<Restaurant> => {

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
      return data;

    } catch (error) {
      console.error("Error creating my restaurant:", error);
      throw error;
    }
  },
    [getAccessTokenSilently]
  );

  const { mutate: createRestaurant,
    isLoading,
    error,
    isSuccess
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchMyRestaurant");
      toast.success("Restaurant created!");
    },
    onError: () => {
      toast.error("Failed to create restaurant");
    }
  });

  return { createRestaurant, isLoading, isSuccess, error };
}


// Get current user's restaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const getMyRestaurantRequest = useCallback(async (): Promise<Restaurant> => {
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
        // Check if the error is because the restaurant does not exist
        if (response.status === 404) {
          throw new Error("No restaurant found");
        } else {
          throw new Error(errorData.message || "Failed to load restaurant");
        }
      }

      const result = await response.json();
      return result.data;

    } catch (error) {
      console.error("Error getting my restaurant:", error);
      throw error;
    }
  }, [getAccessTokenSilently]);

  const { data: restaurant, isLoading, error, isSuccess } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  if (error instanceof Error && error.message === "Failed to load restaurant") {
    toast.info("You haven't created a restaurant yet.");
  }
  if (isSuccess && isInitialLoading) {
    toast.success("Restaurant data loaded");
  } else if (isSuccess) {
    setIsInitialLoading(false);
  }

  if (error instanceof Error) {
    toast.error(error.message);
  }

  return { restaurant, isLoading };
}


// Update current user's restaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyRestaurantRequest = useCallback(async (restaurantFormData: FormData): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update restaurant");
      }

      const result = await response.json();
      return result.data;

    } catch (error) {
      console.error("Error updating my restaurant:", error);
      throw error;
    }
  }, [getAccessTokenSilently]);


  const { mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess
  } = useMutation(updateMyRestaurantRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchMyRestaurant").then(() => {
        toast.success("Restaurant successfully updated!");
      });
    },
    onError: () => {
      toast.error("Failed to update restaurant");
    }
  });

  return { updateRestaurant, isLoading, isSuccess, error };
}