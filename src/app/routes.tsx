import { Routes, Route } from 'react-router-dom';
import { Error } from '@/pages';
import { Layout } from '@/layouts';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout>Home Page</Layout>} />
            <Route path="/user-profile" element={<span>User Profile Page</span>} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;