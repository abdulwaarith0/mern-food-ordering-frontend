import { Button, Form, Separator } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "../details-section";
import CuisinesSection from "../cuisines-section";
import MenuSection from "../menu-section";
import ImageSection from "../image-section";
import { Loader2 } from "lucide-react";


const formSchema = z.object({
    restaurantName: z.string().min(1, { message: "Restaurant name is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item",
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required"),
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.optional(z.instanceof(File)),
    }).refine((data) => data.imageUrl || data.imageFile, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],

})

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}


const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    const onSubmit = (_formDataJson: restaurantFormData) => {
        /// TODO: convert formDataJson to FormData object
        const formData = new FormData();
        formData.append("restaurantName", _formDataJson.restaurantName);
        formData.append("city", _formDataJson.city);
        formData.append("country", _formDataJson.country);
        formData.append("deliveryPrice", _formDataJson.deliveryPrice.toString());
        formData.append("estimatedDeliveryTime", _formDataJson.estimatedDeliveryTime.toString());
        _formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        _formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(
                `menuItems[${index}][price]`,
                (menuItem.price * 100).toString()
            );
        });

        if (_formDataJson.imageFile) {
            formData.append(`imageFile`, _formDataJson.imageFile);
        }

        onSave(formData);

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                <Separator />

                {/* {isLoading ? <LoadingButton /> :
                    <Button type="submit">
                        Submit
                    </Button>
                } */}

                {isLoading ?
                    <div className="flex justify-center">
                        <Loader2 className="animate-spin" />
                    </div> :
                    <Button type="submit">
                        Submit
                    </Button>
                }


            </form>
        </Form>
    )
}



export default ManageRestaurantForm;
