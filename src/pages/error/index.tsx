import { Button } from '@/components';
import React from 'react'; 
import { Link } from "react-router-dom";


const Error: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-red-500">
                Error
            </h1>
            <p className="text-lg">An unexpected error occurred.</p>
            <Button>
                <Link to="/">Go back to home</Link>
            </Button>
        </div>
    );
}

export default Error;   
