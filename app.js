const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");

app.get("/", (req, res) => {
	res.send("Hello from the server!");
});

app.use("/", userRouter);

module.exports = app;
