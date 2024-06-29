const express = require("express");
const cors = require("cors");
const utils = require("../utils");
const controller = require("../controller/userController");
const middlware = require("../middlware/userAuthorization");

const router = express.Router();

router.get("/api", middlware.authenticateToken, controller.getAllUsersApi);

router.get("/api/:id", middlware.authenticateToken, controller.getPersonAndPetsByPersonIdApi);

router.get("/api/pet/:aid", middlware.authenticateToken, controller.getPetByIdApi);

router.post("/api/pet", middlware.authorizePetChange, controller.createPetApi);

router.put("/api/:id", middlware.authorizeUserChange, controller.updatePersonApi);

router.put("/api/pet/:aid", middlware.authorizePetChange, controller.updatePetApi);

router.delete("/delete/:id", middlware.authorizeUserChange, controller.deletePersonApi);

router.delete("/api/pet/:aid", middlware.authorizePetChange, controller.deletePetApi);

module.exports = router;
