import { Order } from "@/types"
import { Badge, Card, CardContent, CardHeader, CardTitle, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import { Separator } from "@radix-ui/react-separator";
import { ORDER_STATUS } from "@/config/order-status-config";



type Props = {
    order: Order;
}

const OrderItemCard = ({ order }: Props) => {
    const { deliveryDetails, status, totalAmount, createdAt, cartItems } = order;

    const getTime = () => {
        return new Date(createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle
                    className="grid md:grid-cols-4 gap-4 justify-between mb-3"
                >
                    <div>
                        Customer name:
                        <span className="ml-2 font-normal">
                            {deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery details:
                        <span className="ml-2 font-normal">
                            {deliveryDetails.addressLine1}, {deliveryDetails.country}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total cost:
                        <span className="ml-2 font-normal">
                            ￡{(totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {cartItems.map((item) => (
                        <span key={item.menuItemId}>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1 5">
                    <Label htmlFor="status">
                        What is the status of this order?
                    </Label>
                    <Select value={status} >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (
                                <SelectItem
                                    key={status.value}
                                    value={status.value}
                                >
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

    )
}

export default OrderItemCard;