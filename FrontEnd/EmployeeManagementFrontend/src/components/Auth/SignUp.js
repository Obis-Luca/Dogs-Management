import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Authenticate() {
	const { login } = useAuth();
	const [name, setname] = useState("");
	const [age, setage] = useState("");
	const [salary, setsalary] = useState("");
	const [password, setPassword] = useState("");

	let history = useNavigate();

	async function register(e) {
		e.preventDefault();

		if (name === "" || age === "" || salary === "" || parseInt(age) < 0 || parseInt(salary) < 0) {
			alert("invalid input");
			setname("");
			setage("");
			setsalary("");
			setPassword("");
			window.location.reload();
			return;
		}

		const newUser = { name: name, age: age, salary: salary, password: password };
		try {
			const response = await fetch("http://localhost:5000/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newUser),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Registration failed. Please try again.");
			}

			const data = await response.json();

			login(name, data.accessToken);
			history("/home");
		} catch (error) {
			alert(error.message);
			setname("");
			setage("");
			setsalary("");
			setPassword("");
			window.location.reload();
		}
	}

	return (
		<div>
			<Form className="d-grid gap-2" style={{ margin: "5rem" }}>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Control onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter Name" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicAge">
					<Form.Control onChange={(e) => setage(e.target.value)} type="number" placeholder="Age" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicSalary">
					<Form.Control onChange={(e) => setsalary(e.target.value)} type="number" placeholder="Salary" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
				</Form.Group>

				<Button onClick={register} variant="primary" type="submit">
					Submit
				</Button>

				<Link className="d-grid gap-2" to="/">
					<Button variant="info" size="lg">
						Log in
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Authenticate;
