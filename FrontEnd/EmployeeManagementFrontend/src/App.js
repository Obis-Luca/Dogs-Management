import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authenticate from "./components/Auth/SignUp";
import Edit from "./components/Edit";

import Details from "./components/Details";
import MyChart from "./components/Chart";
import PetCreate from "./components/petCreate";
import PetEdit from "./components/petEdit";
import PetDetails from "./components/petDetails";
import LogIn from "./components/Auth/LogIn";
import { AuthProvider } from "./components/Auth/AuthProvider";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ServerHealthApi from "./ServerHealthApi";
import Home from "./components/Home/Home";

export const ArrayContext = React.createContext();
export const ServerStateContext = React.createContext();
export const PetArrayContext = React.createContext();

function App() {
	const [array, setArray] = useState([]);
	const [petArr, setPetArr] = useState([]);
	const [serverState, setServerState] = useState(true);
	const [IsOnline, setIsOnline] = useState(true);

	ServerHealthApi.serverHealthCheck(setServerState);
	ServerHealthApi.checkServerOnline(setIsOnline);

	return !IsOnline ? (
		<div>Check your network</div>
	) : !serverState ? (
		<div>400 Server down</div>
	) : !array ? (
		<div> Array loading...</div>
	) : (
		<ArrayContext.Provider value={[array, setArray]}>
			<ServerStateContext.Provider value={[serverState, setServerState]}>
				<PetArrayContext.Provider value={[petArr, setPetArr]}>
					<AuthProvider>
						<Router>
							<Routes>
								{/* Public routes */}
								<Route path="/" element={<LogIn />} />
								<Route path="/auth" element={<Authenticate />} />

								{/* Protected routes */}
								<Route path="/" element={<PrivateRoute />}>
									<Route path="/home" element={<Home />} />
									<Route path="/edit" element={<Edit />} />
									<Route path="/person/:personId" element={<Details />} />
									<Route path="/chart" element={<MyChart />} />
									<Route path="/pet/:aid" element={<PetDetails />} />
									<Route path="/pet/create" element={<PetCreate />} />
									<Route path="/pet/edit" element={<PetEdit />} />
								</Route>
							</Routes>
						</Router>
					</AuthProvider>
				</PetArrayContext.Provider>
			</ServerStateContext.Provider>
		</ArrayContext.Provider>
	);
}

export default App;
