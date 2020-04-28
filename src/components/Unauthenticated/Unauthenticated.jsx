import React from 'react';
import {Link} from 'react-router-dom';

export default function Unauthenticated() {
    return (
        <div>
            <h2>упс, не авторизован</h2> 
            <Link to="/auth">Авторизоваться</Link>
        </div>
    )
}
