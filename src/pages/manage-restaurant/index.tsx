import { ManageRestaurantForm } from "@/forms";
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/hooks";


const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();

    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    )
}

export default ManageRestaurantPage;