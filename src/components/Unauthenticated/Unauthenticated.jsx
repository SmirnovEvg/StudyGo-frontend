import React from 'react';
import {Link} from 'react-router-dom';

export default function Unauthenticated() {
    return (
        <div>
            упс, не авторизован
            <Link to="/auth">Авторизоваться</Link>
        </div>
    )
}
