import { Navigate, useLocation } from "react-router-dom";
import { api } from "@/services/api";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();

    if (!api.isAuthenticated()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them back to that page after they login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
