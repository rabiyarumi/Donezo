import Navbar from '../shared/Navbar';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;