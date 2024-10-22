import { Form } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "../details-section";


const formSchema = z.object({
    restaurantName: z.string().min(1, { message: "Restaurant name is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    deliverPrice: z.coerce.number().min(1, { message: "Delivery price is required" }),
    estimatedDeliveryTime: z.coerce.number().min(1, { message: "Estimated delivery time is required" }),
    cuisines: z.array(z.string()).min(1, { message: "At least one cuisine is required" }),
    menuItems: z.array(z.object({
        name: z.string().min(1, { message: " name is required" }),
        price: z.coerce.number().min(1, { message: " price is required" }),
    })).min(1, { message: "At least one menu item is required" }),
    imageFile: z.instanceof(File).refine((file) => file.size <= 1024 * 1024 * 5, { message: "Image must be less than 5MB" }),

});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}


const ManageRestaurantForm = ({ onSave }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    const onSubmit = (_formDataJson: restaurantFormData) => {
        /// TODO: convert formDataJson to FormData object
        onSave( new FormData);

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
            </form>
        </Form>
    )
}



export default ManageRestaurantForm;
