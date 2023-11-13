import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const context = useAuth();
    const location = useLocation();

    console.log(allowedRoles)

    return (
        // <p>{context.auth.role} - {allowedRoles}</p>
        context.auth?.role == allowedRoles
            ? <Outlet />
            : <Navigate to="/sign-in" state={{ from: location }} replace />
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        //     ? <Outlet />
        //     : auth?.user
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;