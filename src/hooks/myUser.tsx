import { useCallback } from 'react';
import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { ISector, IResponseData } from "../types";
import { useAuth0 } from '@auth0/auth0-react';

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

    const { mutateAsync: updateUser, isLoading, isError, isSuccess, reset } = useMutation(updateMyUserRequest);

    return { updateUser, isLoading, isError, isSuccess, reset };
}