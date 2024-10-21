import { Button } from "@/components";
import { UserProfileForm } from "@/forms";
import { useUpdateMyUser, useGetMyUser } from "@/hooks";
import { useNavigate } from "react-router-dom";


const UserProfilePage = () => {
    const { updateUser, isLoading: isUpdating } = useUpdateMyUser();
    const { currentUser, isLoading: isGetting } = useGetMyUser();
    const navigate = useNavigate();

    if (isGetting) {
        return <span>Loading...</span>;
    }

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <span className="text-red-500 text-2xl font-bold">
                    Unable to load user profile
                </span>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Go to home
                </Button>
            </div>
        )
    }

    return (
        <UserProfileForm
            currentUser={currentUser}
            onSave={updateUser}
            isLoading={isUpdating}
        />
    )
}

export default UserProfilePage;   