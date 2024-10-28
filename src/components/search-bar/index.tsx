import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, FormControl, FormField, FormItem, Input } from "../ui";
import { Search } from "lucide-react";
import { useEffect } from "react";



const fromSchema = z.object({
    searchQuery: z.string().min(1, "Restaurant name is required"),
});

export type SearchForm = z.infer<typeof fromSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder?: string;
    onReset?: () => void;
    searchQuery?: string;
}

const SearchBar = React.memo(({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            searchQuery: searchQuery || "",
        }
    });

    useEffect(() => {
        form.reset({ searchQuery: searchQuery || "" })
    }, [searchQuery])

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });
        if (onReset) {
            onReset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
                <Search
                    className="ml-1 text-orange-500 hidden md:block"
                    strokeWidth={2.5}
                    size={30}
                />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder={placeHolder}
                                    {...field}
                                    className="border-none bg-transparent placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="rounded-full"
                >
                    Reset
                </Button>

                <Button
                    type="submit"
                    className="rounded-full bg-orange-500 text-white"
                >
                    Search
                </Button>
            </form>
        </Form>
    )
})

export default SearchBar;