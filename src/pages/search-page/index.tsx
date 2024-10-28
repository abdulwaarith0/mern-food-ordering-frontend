import { LoadingButton, SearchBar, SearchResultCard, SearchResultInfo } from "@/components";
import { SearchForm } from "@/components/search-bar";
import { useSearchRestaurant } from "@/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: ""
    });
    const { results, isLoading } = useSearchRestaurant(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: ""
        }))
    };

    if (!results?.data || !city) {
        return <span>No results found</span>
    } else if (isLoading) {
        return <span>
            <LoadingButton />
        </span>
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                insert cuisines list here :)
            </div>
            <div id="main-content"
                className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant name"
                    onReset={resetSearch} />
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