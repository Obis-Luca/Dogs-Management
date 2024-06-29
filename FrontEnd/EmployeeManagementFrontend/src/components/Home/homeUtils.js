import { useEffect } from "react";

async function getAllUsers(setArray, setServerState) {
	const token = localStorage.getItem("authToken");
	useEffect(() => {
		fetch("http://localhost:5000/api", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const sorted = data.sort((a, b) => {
					let x = a.Name.toLowerCase();
					let y = b.Name.toLowerCase();
					return x < y ? -1 : x > y ? 1 : 0;
				});
				setArray(sorted);
			})
			.catch((err) => {
				setServerState(false);
				console.log(err);
			});
	}, []);
}

function deleted(id) {
	const token = localStorage.getItem("authToken");

	fetch(`http://localhost:5000/delete/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.ok) alert("User successfully deleted");
			else if (res.status === 403) alert("You do not have permission to do that");
			else if (res.status === 402) alert("User already has pets");
		})
		.catch((err) => {
			alert(err);
			return;
		});
}

function paginate(array, currentPage, recPerPage) {
	const lastIndex = currentPage * recPerPage;
	const firstIndex = lastIndex - recPerPage;
	const records = array.slice(firstIndex, lastIndex);
	const nPage = Math.ceil(array.length / recPerPage);
	const numbers = [...Array(nPage + 1).keys()].slice(1);

	return { records, nPage, numbers };
}

const logOut = (logout, history) => {
	if (window.confirm("Are you sure you want to log out?")) {
		logout();
		history("/");
	}
};

export default { getAllUsers, deleted, paginate, logOut };
