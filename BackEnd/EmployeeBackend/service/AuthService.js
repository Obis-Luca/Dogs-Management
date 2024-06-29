const utils = require("../utils");
const db = utils.db;

async function findUserByName(name, password) {
	const userQuery = "SELECT * FROM person WHERE name = ?";
	return new Promise((resolve, reject) => {
		db.query(userQuery, [name], (err, result) => {
			if (err) return reject(err);
			resolve(result[0]);
		});
	});
}

async function addUser(name, age, salary, password) {
	const values = [name, parseInt(age), parseInt(salary), password, "user"];
	const sql = "INSERT INTO person (`Name`, `Age`, `Salary`, `password`, `Role`) VALUES (?);";

	return new Promise((resolve, reject) => {
		db.query(sql, [values], async (err, result) => {
			if (err) {
				if (err.code === "ER_DUP_ENTRY") {
					return reject(new Error("A user with that name already exists."));
				}
				return reject(err);
			}

			const userTokenBody = { name, password, role: "user" };
			const accessToken = utils.generateAccessToken(userTokenBody);
			resolve({ accessToken });
		});
	});
}

module.exports = {
	findUserByName,
	addUser,
};
