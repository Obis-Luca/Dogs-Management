import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PetArrayContext } from "../App";
import { Button, Table } from "react-bootstrap";

function Details() {
	const [person, setPerson] = useState(null);
	const { personId } = useParams();
	const [petArr, setPetArr] = useContext(PetArrayContext); //[{aid: 1 uid: 1 name: ...}, {...}, ...]

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		fetch(`http://localhost:5000/api/${personId}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setPerson(data.user);
				setPetArr(data.pets);
			})
			.catch((err) => console.log(err));
	}, []);

	const deleted = (aid) => {
		const token = localStorage.getItem("authToken");

		fetch(`http://localhost:5000/api/pet/${aid}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) {
					return res.json().then((error) => {
						throw new Error(error.message);
					});
				}
				alert("Pet deleted successfully");
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	const setPetEditDetails = (aid, uid, name) => {
		localStorage.setItem("aid", aid);
		localStorage.setItem("uid", uid);
		localStorage.setItem("Name", name);
	};

	return !person ? (
		<div>Loading...</div>
	) : (
		<div style={{ padding: "20px" }}>
			<Link to={`/home`}>
				<Button>Back</Button>
			</Link>
			<div>
				<h3>Id: {person.pid}</h3>
				<h3>Name: {person.Name}</h3>
				<h3>Age: {person.Age}</h3>
				<h3>Salary: {person.Salary}</h3>
			</div>

			<br />
			<br />

			<div>
				<h2>This person's dogs</h2>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{petArr.map((item) => {
							return (
								<tr>
									<Link to={`/pet/${item.aid}`}>
										<td>{item.Name}</td>
									</Link>

									<td>
										<Link to={`/pet/edit`}>
											<Button id={"u" + item.Name} onClick={() => setPetEditDetails(item.aid, item.uid, item.Name)} variant="info">
												Update
											</Button>
										</Link>
									</td>

									<td>
										<Button id={"d" + item.Name} onClick={() => deleted(item.aid)} variant="danger">
											Delete
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>

				<Link to={`/pet/create`}>
					<Button variant="warning" size="lg">
						Create
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Details;
