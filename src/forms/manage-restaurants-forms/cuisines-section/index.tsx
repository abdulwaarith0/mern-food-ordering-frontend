import { useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "@/components";
import { cuisineList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "../cuisines-checkbox";

const CuisinesSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">
                    Cuisines
                </h2>
                <FormDescription>
                    Select the cuisines that the restaurant offers
                </FormDescription>
            </div>
            <FormField control={control}
                name="cuisines"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {
                                cuisineList.map((cuisineItem) => (
                                    <CuisineCheckbox
                                        key={cuisineItem}
                                        cuisine={cuisineItem}
                                        field={field}
                                    />
                                ))
                            }
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

    )
}

export default CuisinesSection;
