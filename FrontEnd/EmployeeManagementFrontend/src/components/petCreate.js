import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PetCreate() {
	const [uid, setUid] = useState("");
	const [name, setName] = useState("");

	let history = useNavigate();

	const handelSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("authToken");

		if (uid === "" || name === "" || parseInt(uid) < 0) {
			alert("Invalid input");
			return;
		}

		const newPet = { pet: { uid: uid, Name: name } };
		try {
			const response = await axios.post("http://localhost:5000/api/pet", newPet, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			alert("Pet added successfully!");
		} catch (error) {
			alert(err);
			history("/home");
		}

		history(`/person/${uid}`);
	};

	return (
		<div style={{ padding: "20px" }}>
			<Link to={`/home`}>
				<Button>Back</Button>
			</Link>
			<Form className="d-grid gap-2" style={{ margin: "5rem" }}>
				<Form.Group className="mb-3" controlId="formBasicUid">
					<Form.Control onChange={(e) => setUid(e.target.value)} type="number" placeholder="Enter Uid" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" required />
				</Form.Group>

				<Button onClick={(e) => handelSubmit(e)} variant="primary" type="submit">
					Submit
				</Button>
				<Link className="d-grid gap-2" to="/">
					<Button variant="info" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default PetCreate;
