import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({children}) => {
    const admin = JSON.parse(localStorage.getItem('user'));
    return (
        admin.isAdmin ? children : <Navigate to='/login' />
    );
}
 
export default PrivateRoute;