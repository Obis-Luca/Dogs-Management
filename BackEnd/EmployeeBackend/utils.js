require("dotenv").config();
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const util = require("util");

const db = mysql.createConnection({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE,
});

const checkUserExistance = async (user_id) => {
	const uid = parseInt(user_id);

	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM person WHERE pid = ?";

		db.query(sql, [uid], (err, result) => {
			if (err) reject(new Error("Error checking user existence"));
			else {
				if (result.length === 0) resolve(false);
				else resolve(true);
			}
		});
	});
};

const doesUserHavePets = (user_id) => {
	const uid = parseInt(user_id);

	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM pet WHERE uid = ?";

		db.query(sql, [uid], (err, result) => {
			if (err) reject(new Error("Error checking to see if user has pets"));
			else {
				if (result.length === 0) resolve(false);
				else resolve(true);
			}
		});
	});
};

function authenticateToken(request) {
	const authHeader = request.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return 401;

	try {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		return 403;
	}
}

function generateAccessToken(user) {
	const payload = {
		name: user.name,
		password: user.password,
		role: user.role,
	};
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

async function getUserRoleWithId(id) {
	const query = util.promisify(db.query).bind(db);

	try {
		const sql = await query("SELECT Role FROM person WHERE pid = ?", [id]);
		if (sql.length === 0) return 404;
		return result[0].Role;
	} catch (err) {
		return 400;
	}
}

//aici nu functioneaza cum trebuie
//id-ul pe care il folosesc aici ar trebui sa fie al celuia care face requestul
//nu cel pe care se executa delete-ul

module.exports = { db, authenticateToken, getUserRoleWithId, checkUserExistance, doesUserHavePets, generateAccessToken };
