import { ManageRestaurantForm } from "@/forms";
import { useCreateMyRestaurant } from "@/hooks";



const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();

    return (
        <ManageRestaurantForm
            onSave={createRestaurant}
            isLoading={isLoading}
        />
    )
}

export default ManageRestaurantPage;