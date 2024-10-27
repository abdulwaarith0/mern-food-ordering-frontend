import { LoadingButton, SearchResultCard, SearchResultInfo } from "@/components";
import { useSearchRestaurant } from "@/hooks";
import { useParams } from "react-router-dom";


const SearchPage = () => {
    const { city } = useParams();
    const { results, isLoading } = useSearchRestaurant(city);

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    if (isLoading) {
        return <LoadingButton />
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                insert cuisines list here :)
            </div>
            <div id="main-content"
                className="flex flex-col gap-5">
                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultCard
                        restaurant={restaurant}
                        key={restaurant._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchPage;