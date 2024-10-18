import { Routes, Route } from 'react-router-dom';
import { Error } from '@/pages';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<span>Home Page</span>} />
            <Route path="/user-profile" element={<span>User Profile Page</span>} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AppRoutes;