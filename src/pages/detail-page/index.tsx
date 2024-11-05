import { AspectRatio, LoadingButton, RestaurantInfo, MenuItem, Card, OrderSummary } from "@/components";
import { useGetRestaurant } from "@/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "@/types";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // Initialize state from local storage
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((item) => item._id === menuItem._id);
            let updatedCartItems;
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((item) =>
                    item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ];
            }
            return updatedCartItems;
        });
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => item._id !== cartItem._id);
            return updatedCartItems;
        });
    }

    if (isLoading || !restaurant) {
        return <LoadingButton />;
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img className="rounded-md object-cover h-full w-full"
                    src={restaurant.imageUrl}
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem
                            menuItem={menuItem}
                            key={menuItem._id}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            cartItems={cartItems}
                            restaurant={restaurant}
                            removeFromCart={removeFromCart}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}


export default DetailPage;