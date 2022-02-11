import React from 'react';
import { Link } from 'react-router-dom';

export default function Option() {
    return (
        <div className='option-container'>
            <Link className='link home'to='/'>Home</Link>
            <Link className='link name'to='/search'>Name</Link>
        </div>
    )
}
