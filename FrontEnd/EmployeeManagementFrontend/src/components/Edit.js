import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
	const [name, setname] = useState("");
	const [age, setage] = useState("");
	const [salary, setSalary] = useState("");
	const [password, setPassword] = useState("");
	const [id, setid] = useState("");

	let history = useNavigate();

	function setValuesFromLocalStorage() {
		setname(localStorage.getItem("Name"));
		setage(localStorage.getItem("Age"));
		setSalary(localStorage.getItem("Salary"));
		setid(localStorage.getItem("id"));
		setPassword(localStorage.getItem("Password"));
	}

	const handelSubmit = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("authToken");

		if (name === "" || age === "" || salary === "" || password === "" || parseInt(age) < 0 || parseInt(salary) < 0) {
			alert("Invalid input");
			setValuesFromLocalStorage();
			return;
		}

		const newData = {
			updatedUser: {
				Name: name,
				Age: parseInt(age),
				Salary: parseInt(salary),
				password: password,
			},
		};

		axios
			.put(`http://localhost:5000/api/${id}`, newData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch((err) => {
				if (err.response && err.response.status === 403) alert("Forbidden: You do not have permission to perform this action.");
			});

		history("/home");
	};

	useEffect(() => setValuesFromLocalStorage(), []);

	return (
		<div>
			<Form className="d-grid gap-2" style={{ margin: "5rem" }}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter Name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicAge">
					<Form.Control value={age} onChange={(e) => setage(e.target.value)} type="number" placeholder="Age" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicSalary">
					<Form.Control value={salary} onChange={(e) => setSalary(e.target.value)} type="number" placeholder="Salary" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
				</Form.Group>

				<Button onClick={(e) => handelSubmit(e)} variant="primary" size="lg">
					Update
				</Button>

				<Link className="d-grid gap-2" to="/home">
					<Button variant="warning" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Edit;
