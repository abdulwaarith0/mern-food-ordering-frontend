import { AspectRatio, LoadingButton, RestaurantInfo, MenuItem } from "@/components";
import { useGetRestaurant } from "@/hooks";
import { useParams } from "react-router-dom";



const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

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
                        <MenuItem menuItem={menuItem} key={menuItem._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailPage;