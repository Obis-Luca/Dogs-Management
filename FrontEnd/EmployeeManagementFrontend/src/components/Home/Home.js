import React, { useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ArrayContext, ServerStateContext } from "../../App";
import "../../styles/Home.css";
import homeUtils from "./homeUtils";
import { useAuth } from "../Auth/AuthProvider";

function Home() {
	const [array, setArray] = useContext(ArrayContext);
	const [serverState, setServerState] = useContext(ServerStateContext);
	const [currentPage, setCurrentPage] = useState(1);
	const history = useNavigate();
	const { logout } = useAuth();

	//fetches
	homeUtils.getAllUsers(setArray, setServerState);
	const deleted = (id) => homeUtils.deleted(id);
	const logOut = () => homeUtils.logOut(logout, history);

	const setEditValues = (person) => {
		localStorage.setItem("id", person.pid);
		localStorage.setItem("Name", person.Name);
		localStorage.setItem("Age", person.Age);
		localStorage.setItem("Salary", person.Salary);
		localStorage.setItem("Password", person.password);
	};

	// Pagination logic
	const recPerPage = 5;
	const { records, nPage, numbers } = homeUtils.paginate(array, currentPage, recPerPage);

	const handlePrev = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	};

	const handlePChange = (n) => {
		setCurrentPage(n);
	};

	const handleNext = () => {
		if (currentPage !== nPage) setCurrentPage(currentPage + 1);
	};

	return !array ? (
		<div> Array loading...</div>
	) : (
		<div className="home-container">
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Name</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{records.map((item) => {
						return (
							<tr key={item.pid}>
								<Link to={`/person/${item.pid}`}>
									<td>{item.Name}</td>
								</Link>
								<td>
									<Link to={`/edit`}>
										<Button id={"u" + item.Name} onClick={() => setEditValues(item)} variant="info">
											Update
										</Button>
									</Link>
								</td>
								<td>
									<Button id={"d" + item.Name} onClick={() => deleted(item.pid)} variant="danger">
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			<nav>
				<ul className="pagination">
					<li className="page-item">
						<a href="#" className="page-link" onClick={handlePrev}>
							Prev
						</a>
					</li>
					{numbers.map((n, i) => (
						<li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
							<a href="#" className="page-link" onClick={() => handlePChange(n)}>
								{n}
							</a>
						</li>
					))}
					<li className="page-item">
						<a href="#" className="page-link" onClick={handleNext}>
							Next
						</a>
					</li>
				</ul>
			</nav>

			<Link to={"/chart"}>
				<Button variant="info">View Chart</Button>
			</Link>

			<Button onClick={() => logOut()} variant="danger">
				Log out!
			</Button>
		</div>
	);
}

export default Home;
