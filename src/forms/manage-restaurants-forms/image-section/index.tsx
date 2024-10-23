import { FormControl, FormDescription, FormField, FormItem, FormMessage, Input } from "@/components";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";


const ImageSection = () => {
    const { control, watch } = useFormContext();

    const existingImageUrl = watch("imageUrl");

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

            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={existingImageUrl}
                            alt="Restaurant Image"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field: { onChange, onBlur, name, ref } }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="bg-white"
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={(event) => {
                                        const file = event.target.files ? event.target.files[0] : null;
                                        onChange(file);
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