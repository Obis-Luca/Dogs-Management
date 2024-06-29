import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

function LogIn() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const history = useNavigate();

	const authenticate = async (e) => {
		e.preventDefault();

		if (name === "" || password === "") {
			alert("Invalid input");
			return;
		}

		const login_data = { name, password };

		try {
			const response = await axios.post("http://localhost:5000/login", login_data, {
				headers: { "Content-Type": "application/json" },
			});
			const token = response.data.accessToken;
			login(name, token);

			history("/home");
		} catch (error) {
			alert(error.response.data.error || "Login failed. Please check your credentials.");
			window.location.reload();
		}
	};

	return (
		<div>
			<Form className="d-grid gap-2" style={{ margin: "5rem" }}>
				<Form.Group className="mb-3" controlId="formBasicName" data-cy="formname">
					<Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
				</Form.Group>

				<Button onClick={authenticate} variant="primary" type="submit">
					Submit
				</Button>

				<Link className="d-grid gap-2" to="/auth">
					<Button variant="warning" size="lg">
						Sign Up!
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default LogIn;
