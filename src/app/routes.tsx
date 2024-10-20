import { Routes, Route } from 'react-router-dom';
import { AuthCallback, Error, Home } from '@/pages';
import { Layout } from '@/layouts';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/user-profile" element={<span>User Profile Page</span>} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;