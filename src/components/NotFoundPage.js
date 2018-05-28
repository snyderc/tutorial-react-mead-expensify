import React from 'react';

import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>404</p>
        <Link to='/'>
            Go home
        </Link>
    </div>
)

export default NotFoundPage;