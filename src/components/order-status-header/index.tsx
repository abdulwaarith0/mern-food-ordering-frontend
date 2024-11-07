import { Order } from "@/types";
import { Progress } from "../ui";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
}

const OrderStatusHeader = ({ order }: Props) => {

    const getExpectedDelivery = () => {
        const createdAt = new Date(order.createdAt);
        createdAt.setMinutes(createdAt.getMinutes() +
            order.restaurant.estimatedDeliveryTime);

        // Format time to 12-hour format with AM/PM
        return createdAt.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
    }

    const getStatusOrderInfo = () => {
        return (ORDER_STATUS.find((status) => status.value === order.status)
            || ORDER_STATUS[0]
        );
    };

    return (
        <>
            <h1
                className="text-2xl tracking-tighter font-bold flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order status:  {getStatusOrderInfo()?.label} </span>
                <span> Expected delivery by: {getExpectedDelivery()} </span>
            </h1>
            <Progress className="animate-pulse"
                value={getStatusOrderInfo()?.progressValue}
            />
        </>
    )
}

export default OrderStatusHeader;