const utils = require("../utils");

const authenticateToken = (req, res, next) => {
	const statusCode = utils.authenticateToken(req);
	if (statusCode !== 401 && statusCode !== 403) next();
	else res.status(statusCode).send("Request could not be completed");
};

const authorizeUserChange = async (req, res, next) => {
	const id = parseInt(req.params.id);

	const getUserWithRoleIdQueryResult = utils.getUserRoleWithId(id);
	if (getUserWithRoleIdQueryResult === 404) res.status(404).send("User with that Id doesn't exist");
	else if (getUserWithRoleIdQueryResult === 400) res.status(400).send("Something went wrong while fetching the user");
	else {
		const toUser = getUserWithRoleIdQueryResult;

		let decoded = utils.authenticateToken(req);
		if (decoded === 401) res.status(401).send("Token not found");
		else if (decoded === 403) res.status(403).send("Unauthorized request");
		else {
			const fromUser = decoded.role;

			if (fromUser === "user") return res.status(403).send("No permission");
			else if (fromUser === "manager" && (toUser === "admin" || toUser === "manager")) return res.status(403).send("No permission");
			else next();
			//from user = user -> no permisssions
			//from user = manager -> only allow for toUser = 'User'
			//from user = admin -> allow everything
		}
	}
};

const authorizePetChange = async (req, res, next) => {
	const token = utils.authenticateToken(req);
	if (token === 401) res.status(401).send("Token not found");
	else if (token === 403) res.status(403).send("Token is unauthorized");
	else {
		const fromUser = token.role;
		if (fromUser === "user") return res.status(403).json({ message: "No permission" });
		next();
	}
};

module.exports = { authenticateToken, authorizeUserChange, authorizePetChange };
