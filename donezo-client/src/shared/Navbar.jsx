import useAuth from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const {user} = useAuth()
    return (
        <nav className='bg-black py-4 text-center flex justify-between px-10'>
            <p className='text-white text-4xl font-bold'>Donezo</p>
            <div className='text-white flex gap-4 items-center'>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/add-task"}>Add Task</NavLink>
            </div>
            {
                user && <p>
                    <img src={user?.photoURL} alt="" className='h-12 rounded-full' />
                </p>
            }
        </nav>
    );
};

export default Navbar;