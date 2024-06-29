import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PetDetails() {
	const { aid } = useParams();
	const [pet, setPet] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		fetch(`http://localhost:5000/api/pet/${aid}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setPet(data[0]);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div style={{ padding: "20px" }}>
			<h3>Aid: {pet.aid}</h3>
			<h3>Uid: {pet.uid}</h3>
			<h3>Name: {pet.Name}</h3>
		</div>
	);
}

export default PetDetails;
