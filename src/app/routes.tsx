import { Routes, Route } from 'react-router-dom';
import { AuthCallback, DetailPage, Error, Home, ManageRestaurantPage, OrderStatus, SearchPage, UserProfilePage } from '@/pages';
import { Layout } from '@/layouts';
import { ProtectedRoute } from '@/auth';



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
            <Route path="/search/:city"
                element={<Layout showHero={false}>
                    <SearchPage />
                </Layout>}
            />
            <Route path="/detail/:restaurantId"
                element={<Layout showHero={false}> 
                    <DetailPage />
                </Layout>}
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element=
                    {
                        <Layout showHero={false}>
                            <UserProfilePage />
                        </Layout>
                    }
                />
                <Route
                    path="/order-status"
                    element={<Layout showHero={false}>
                        <OrderStatus />
                    </Layout>}
                />
                <Route
                    path="/manage-restaurant"
                    element=
                    {<Layout showHero={false}>
                        <ManageRestaurantPage />
                    </Layout>}
                />
            </Route>

            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;