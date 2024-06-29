const service = require("../service/userService");
const utils = require("../utils");

async function getAllUsersApi(req, res) {
	try {
		const result = await service.getAllUsers();
		return res.send(result);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function deletePersonApi(req, res) {
	try {
		const id = parseInt(req.params.id);

		const userHasPets = await utils.doesUserHavePets(id);
		if (userHasPets) {
			res.status(402).send("Cannot delete this user! He has pets");
			return;
		}

		await service.deletePerson(id);
		return res.status(200).send("User deleted successfully");
	} catch (error) {
		res.status(500).send("Internal server error");
	}
}

async function updatePersonApi(req, res) {
	try {
		const id = parseInt(req.params.id);
		const { Name, Age, Salary, password } = req.body.updatedUser;

		if (!id) throw new Error("Invalid ID");
		if (Name === undefined || Age === undefined || Salary === undefined || password === undefined) throw new Error("Name, Age, Salary, or password is missing");

		const result = await service.updatePerson(id, { Name, Age, Salary, password });
		if (result.affectedRows === 0) res.status(404).send("Person not found");
		else res.status(200).send("Updated successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
}

async function getPersonAndPetsByPersonIdApi(req, res) {
	try {
		const id = parseInt(req.params.id);
		const result = await service.getPersonAndPetsByPersonId(id);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

async function getPetByIdApi(req, res) {
	try {
		const aid = parseInt(req.params.aid);
		const pets = await service.getPetById(aid);
		res.status(200).json(pets);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

async function createPetApi(req, res) {
	try {
		const newPet = req.body.pet;

		if (!newPet || typeof newPet !== "object" || !newPet.Name || !newPet.uid) return res.status(400).json({ message: "Invalid data format" });

		const userExists = await utils.checkUserExistance(newPet.uid);
		if (!userExists) return res.status(404).json({ message: "User with that ID doesn't exist" });

		await service.createPet(newPet.uid, newPet.Name);
		res.status(200).send("Pet added successfully");
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
}

async function updatePetApi(req, res) {
	try {
		const aid = parseInt(req.params.aid);
		const { uid, Name } = req.body.updatedPet;

		if (!aid) throw new Error("Invalid ID");
		if (uid === undefined || Name === undefined) throw new Error("User ID or Name is missing");

		const personExists = await utils.checkUserExistance(uid);
		if (!personExists) return res.status(404).json({ message: "Person with that ID doesn't exist" });

		await service.updatePet(aid, { uid, Name });
		res.status(200).json({ message: "Updated successfully" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function deletePetApi(req, res) {
	try {
		const aid = parseInt(req.params.aid);

		await service.deletePet(aid);
		res.status(200).json({ message: "Pet deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: "Invalid delete attempt on pets" });
	}
}

module.exports = {
	getAllUsersApi,
	deletePersonApi,
	updatePersonApi,
	getPersonAndPetsByPersonIdApi,
	getPetByIdApi,
	createPetApi,
	updatePetApi,
	deletePetApi,
};
