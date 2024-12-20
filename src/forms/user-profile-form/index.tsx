import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, Button } from "@/components";
import { LoadingButton } from "@/components";
import { useEffect } from "react";
import { User } from "@/types";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    city: z.string().min(1, { message: "City is required" }),
})

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
}

export const UserProfileForm = ({ 
    currentUser,
    onSave,
    isLoading,
    title = "User Profile",
    buttonText = "Submit"
}: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form]);



    return (
        <Form  {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>
                    <FormDescription>
                        View and update your profile information here
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={(
                        { field }
                    ) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button
                        type="submit"
                        className="bg-orange-500">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    )
}

