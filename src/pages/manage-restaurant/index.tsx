import { ManageRestaurantForm } from "@/forms";
import { useCreateMyRestaurant, useGetMyRestaurant } from "@/hooks";


const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();

    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={createRestaurant}
            isLoading={isLoading}
        />
    )
}

export default ManageRestaurantPage;