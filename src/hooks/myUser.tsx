/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useMutation, useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { ISector, IResponseData, User } from "../types";
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'sonner';



// Create a new user
export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = useCallback(async (
        user: ISector): Promise<IResponseData<ISector>> => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/my/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create my user");
            }

            const data: IResponseData<ISector> = await response.json();
            return data;
        } catch (error: any) {
            console.error("Error creating user:", error);
            throw error;
        }
    }, []);

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

    return { createUser, isLoading, isError, isSuccess };
};


// Get current user
export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = useCallback(async (): Promise<User> => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/my/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            return result.data;

        } catch (error: any) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }, []);

    const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading, error };
};



// Update current user
type updateMyUserRequest = {
    name: string;
    addressLine1: string;
    country: string;
    city: string;
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = useCallback(async (formData: updateMyUserRequest): Promise<IResponseData<ISector>> => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/my/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update my user");
            }

            const data: IResponseData<ISector> = await response.json();
            return data;

        } catch (error: any) {
            console.error("Error updating user:", error);
            throw error;
        }
    }, []);

    const { mutateAsync: updateUser, isLoading, isError, error, isSuccess, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User profile updated successfully");
    }
    if (error) {
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isLoading, isError, error, isSuccess, reset };
}