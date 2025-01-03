const fs = require("fs");

// Get users
const users = JSON.parse(fs.readFileSync("./users.json"));

exports.getAllUsers = (req, res) => {
	// Respond with users data
	res.status(200).json({
		status: "success",
		count: users.length,
		data: {
			users,
		},
	});
};
