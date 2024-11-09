import { OrderItemCard, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { ManageRestaurantForm } from "@/forms";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/hooks";


const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { orders } = useGetMyRestaurantOrders();

    const isEditing = !!restaurant;

    return (
        <Tabs defaultValue="manage-restaurant">
            <TabsList>
                <TabsTrigger value="manage-restaurant">
                    Manage Restaurant
                </TabsTrigger>
                <TabsTrigger value="orders">
                    Orders
                </TabsTrigger>
            </TabsList>
            <TabsContent
                value="orders"
                className="space-y-5 bg-gray-50 pg-10 rounded-lg"
            >
                <h2 className="text-2xl font-bold">
                    {orders?.length} active orders
                </h2>
                {orders?.map((order) =>
                    <OrderItemCard
                        key={order._id}
                        order={order}
                    />
                )}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading || isUpdateLoading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;