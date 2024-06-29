const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/AuthRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(authRouter);
let refreshTokens = [];

app.get("/", (req, res) => {
	res.send("Main server started");
});

app.get("/api/serverhealth", (req, res) => {
	res.status(200).send("ok");
});

app.delete("/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server started on port ${PORT}`));

module.exports = app;
