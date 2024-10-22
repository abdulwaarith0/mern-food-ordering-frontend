import { FormControl, FormDescription, FormField, FormItem, FormMessage, Input } from "@/components";
import { useFormContext } from "react-hook-form";


const ImageSection = () => {
    const { control, register } = useFormContext();

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
                <FormItem>
                    <FormControl>
                        <Input
                            {...register("imageUrl")}
                            type="text"
                            placeholder="Or enter an image URL"
                            className="bg-white"
                        />
                    </FormControl>
                </FormItem>
            </div>
        </div>
    )
}

export default ImageSection;