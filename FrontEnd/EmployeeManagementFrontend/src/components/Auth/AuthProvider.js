import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (token) setIsAuthenticated(true);
		setLoading(false);
	}, []);

	const login = (newPerson, token) => {
		localStorage.setItem("authToken", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("authToken");

		setIsAuthenticated(false);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
