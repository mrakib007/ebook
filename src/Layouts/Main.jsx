import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div style={{ backgroundColor: '#f0f0f0' }}> 
            <Outlet/>
        </div>
    );
};

export default Main;