import { UserProfileForm } from "@/forms";
import { useUpdateMyUser } from "@/hooks";


const UserProfilePage = () => {
    const { updateUser, isLoading } = useUpdateMyUser();
    return (
        <UserProfileForm
            onSave={updateUser}
            isLoading={isLoading}
        />
    )
}

export default UserProfilePage;   