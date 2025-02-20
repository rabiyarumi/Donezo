import React from 'react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const {user} = useAuth()
    return (
        <nav className='bg-black py-4 text-center flex justify-between px-10'>
            <p className='text-white text-4xl font-bold'>Donezo</p>
            {
                user && <p>
                    <img src={user?.photoURL} alt="" className='h-12 rounded-full' />
                </p>
            }
        </nav>
    );
};

export default Navbar;