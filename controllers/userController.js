const fs = require('fs');

// Get users
const users = JSON.parse(fs.readFileSync('./users.json'));

exports.getAllUsers = (req, res) => {
  // Respond with users data
  res.status(200).json({
    status: 'success',
    count: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  // Get user with ID from the request
  const user = users.find((u) => u.id == req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
