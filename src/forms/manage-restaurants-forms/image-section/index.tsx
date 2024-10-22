import { FormControl, FormDescription, FormField, FormItem, FormMessage, Input } from "@/components";
import { useFormContext } from "react-hook-form";


const ImageSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">
                    Restaurant Image
                </h2>
                <FormDescription>
                    Add an image that will be displayed on your restaurant listing in the search results. Adding a new image will override the existing image.
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 w-[50%]">
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="bg-white"
                                    onChangeCapture={(event) => {
                                        const target = event.target as HTMLInputElement;
                                        if (target.files && target.files[0]) {
                                            field.onChange(target.files[0]); 
                                        } else {
                                            field.onChange(null);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default ImageSection;