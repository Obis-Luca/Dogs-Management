// service/userService.js
const utils = require("../utils");
const db = utils.db;

function getAllUsers() {
	const sql = "SELECT * FROM person";
	return new Promise((resolve, reject) => {
		db.query(sql, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function deletePerson(pid) {
	const sql = "DELETE FROM person WHERE pid = ?";
	return new Promise((resolve, reject) => {
		db.query(sql, [pid], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function updatePerson(id, { Name, Age, Salary, password }) {
	const sql = "UPDATE person SET Name = ?, Age = ?, Salary = ?, password = ? WHERE pid = ?";
	return new Promise((resolve, reject) => {
		db.query(sql, [Name, Age, Salary, password, id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function getPersonAndPetsByPersonId(id) {
	const userQuery = "SELECT * FROM person WHERE pid = ?";
	const petsQuery = "SELECT * FROM pet WHERE uid = ?";

	return new Promise((resolve, reject) => {
		db.query(userQuery, [id], (errUser, userResult) => {
			if (errUser) return reject(errUser);
			db.query(petsQuery, [id], (errPets, petsResult) => {
				if (errPets) return reject(errPets);
				const user = userResult[0];
				const pets = petsResult;
				const response = { user, pets };
				resolve(response);
			});
		});
	});
}

async function getPetById(aid) {
	const sql = "SELECT * FROM pet WHERE aid = ?";
	return new Promise((resolve, reject) => {
		db.query(sql, [aid], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function createPet(uid, name) {
	const sql = "INSERT INTO pet (`uid`, `Name`) VALUES (?, ?)";

	return new Promise((resolve, reject) => {
		db.query(sql, [uid, name], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function updatePet(aid, { uid, Name }) {
	const sql = "UPDATE pet SET uid = ?, Name = ? WHERE aid = ?";
	return new Promise((resolve, reject) => {
		db.query(sql, [uid, Name, aid], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function deletePet(aid) {
	const sql = "DELETE FROM pet WHERE aid = ?";
	return new Promise((resolve, reject) => {
		db.query(sql, [aid], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	getAllUsers,
	deletePerson,
	updatePerson,
	getPersonAndPetsByPersonId,
	getPetById,
	createPet,
	updatePet,
	deletePet,
};
