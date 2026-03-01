import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import Loader from "./Loader";

const ProtectedRoute = () => {
    const { user, loading } = useSelector((state) => state.auth);
    // console.log("ProtectedRoute user:", user);
    
    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }

    if (!user) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;