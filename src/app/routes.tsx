import { Routes, Route } from 'react-router-dom';
import { AuthCallback, Error, Home, UserProfilePage } from '@/pages';
import { Layout } from '@/layouts';
import { ProtectedRoute } from '@/auth';
import { ManageRestaurantForm } from '@/forms';


const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element=
                {<Layout showHero={true}>
                    <Home />
                </Layout>}
            />
            <Route path="/auth-callback"
                element={<AuthCallback />}
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element=
                    {<Layout showHero={false}>
                        <UserProfilePage />
                    </Layout>}
                />
                <Route
                    path="/manage-restaurant"
                    element=
                    {<Layout showHero={false}>
                        <ManageRestaurantForm
                            onSave={() => { }}
                            isLoading={false}
                        />
                    </Layout>}
                />
            </Route>

            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;