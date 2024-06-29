import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated === undefined) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
