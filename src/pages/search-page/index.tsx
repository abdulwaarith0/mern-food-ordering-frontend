import { useSearchRestaurant } from "@/hooks";
import { useParams } from "react-router-dom";


const SearchPage = () => {
    const { city } = useParams();
    const { results } = useSearchRestaurant(city);

    return (
        <span>
            <span>User search for {city}{" "}
                <span>
                    {results?.data.map((restaurant) => (
                        <span key={restaurant._id}>
                            found - {restaurant.restaurantName}, {restaurant.city}
                        </span>
                    ))}
                </span>
            </span>
        </span>
    )
}

export default SearchPage;