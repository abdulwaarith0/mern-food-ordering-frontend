import { AspectRatio, LoadingButton, OrderStatusDetail, OrderStatusHeader } from "@/components";
import { useGetMyOrders } from "@/hooks";



const OrderStatus = () => {
    const { orders, isLoading } = useGetMyOrders();

    if (isLoading) {
        return <LoadingButton />;
    }

    if (!orders || orders.length === 0) {
        return <div>No orders found</div>;
    }

    return (
        <div className="space-y-10">
            {orders.map((order) => (
                <div key={order._id}
                    className="space-y-10 bg-gray-50 p-10 rounded-lg"
                >
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img
                                src={order.restaurant.imageUrl}
                                alt={order.restaurant.restaurantName}
                                className="rounded-md object-cover md-full h-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatus;