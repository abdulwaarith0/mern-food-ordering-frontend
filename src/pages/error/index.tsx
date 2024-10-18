import { Button } from '@/components';
import React from 'react'; 
import { Link } from "react-router-dom";


const Error: React.FC = () => {
    return (
        <div>
            <h1>Error</h1>
            <p>An unexpected error occurred.</p>
            <Button>
                <Link to="/">Go back to home</Link>
            </Button>
        </div>
    );
}

export default Error;   
