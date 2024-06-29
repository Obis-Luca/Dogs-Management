import { useEffect } from "react";

function serverHealthCheck(setServerState) {
	useEffect(() => {
		const checkServerHealth = () => {
			fetch("http://localhost:5000/api/serverhealth")
				.then(() => setServerState(true))
				.catch((error) => {
					console.log("Error checking server health: " + error);
					setServerState(false);
				});
		};

		checkServerHealth();
		const intervalId = setInterval(checkServerHealth, 2000);
		return () => clearInterval(intervalId);
	}, []);
}

function checkServerOnline(setIsOnline) {
	useEffect(() => {
		window.addEventListener("online", () => setIsOnline(true));
		window.addEventListener("offline", () => setIsOnline(false));

		return () => {
			window.removeEventListener("online", () => setIsOnline(true));
			window.removeEventListener("offline", () => setIsOnline(false));
		};
	}, []);
}

export default { serverHealthCheck, checkServerOnline };
