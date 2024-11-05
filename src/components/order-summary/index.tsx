import { CartItem } from "@/pages/detail-page";
import { Restaurant } from "@/types";
import { Badge, CardContent, CardHeader, CardTitle, Separator } from "../ui";
import { Trash } from "lucide-react";


type Props = {
    cartItems: CartItem[];
    restaurant: Restaurant;
    removeFromCart: (cartItem: CartItem) => void;
}

const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
    const getTotalCost = () => {
        const totalInPence = cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);
        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
        return (totalWithDelivery / 100).toFixed(2);
    }

    return (
        <>
            <CardHeader>
                <CardTitle
                    className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>￡{getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                        <span>
                            <Badge variant="outline"
                                className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item)}
                            />
                            ￡{((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>￡{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}


export default OrderSummary;