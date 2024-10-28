import { LoadingButton, SearchBar, SearchResultCard, SearchResultInfo, PaginationSelector, CuisineFilter } from "@/components";
import { SearchForm } from "@/components/search-bar";
import { useSearchRestaurant } from "@/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: []
    });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { results, isLoading } = useSearchRestaurant(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1
        }))
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,

        }));
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))
    }

    if (isLoading) {
        return <span>
            <LoadingButton />
        </span>
    } else if (!results?.data || !city) {
        return <span>No results found</span>
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    onChange={setSelectedCuisines}
                    selectedCuisines={searchState.selectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded) => !prevIsExpanded
                        )}
                />
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
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default SearchPage;