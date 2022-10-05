import React from 'react';
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    
    const history = useNavigate();
    const navigate = (path) => history(path);
    
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default NotFoundPage;