// controller/authController.js
const utils = require("../utils");
const service = require("../service/AuthService");

async function loginApi(req, res) {
	const { name, password } = req.body;

	try {
		const user = await service.findUserByName(name, password);

		if (!user) return res.status(401).json({ error: "User not found" });

		if (password === user.password) {
			const role = user.Role;
			const userTokenBody = { name, password, role };
			const accessToken = utils.generateAccessToken(userTokenBody);
			res.status(200).json({ accessToken });
		} else {
			res.status(401).json({ error: "Invalid password" });
		}
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

const registerApi = async (req, res) => {
	try {
		const { name, age, salary, password } = req.body;
		const { accessToken } = await service.addUser(name, age, salary, password);
		res.status(200).json({ accessToken });
	} catch (error) {
		if (error.message === "A user with that name already exists.") {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

module.exports = {
	loginApi,
	registerApi,
};
