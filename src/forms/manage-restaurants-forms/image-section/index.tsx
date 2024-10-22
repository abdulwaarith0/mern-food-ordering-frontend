import { FormControl, FormDescription, FormField, FormItem, FormMessage, Input } from "@/components";
import { useFormContext } from "react-hook-form";


const ImageSection = () => {
    const { control, setValue } = useFormContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("file input changed:", event.target.files);
        const files = event.target.files;
        if (files && files[0]) {
            setValue("imageFile", files[0], { shouldValidate: true });
            console.log("file set in form:", files[0]);
        }
    };


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
                                    accept="image/*"
                                    className="bg-white"
                                    onChangeCapture={handleFileChange}
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