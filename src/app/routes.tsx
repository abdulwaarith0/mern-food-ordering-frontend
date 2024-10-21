import { Routes, Route } from 'react-router-dom';
import { AuthCallback, Error, Home, UserProfilePage } from '@/pages';
import { Layout } from '@/layouts';


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
                element={<AuthCallback />} />
            <Route
                path="/user-profile"
                element=
                {<Layout showHero={false}>
                    <UserProfilePage />
                </Layout>}
            />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;