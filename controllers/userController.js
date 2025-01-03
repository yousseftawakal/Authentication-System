const fs = require('fs');

// ===================================================

// Get users
const users = JSON.parse(fs.readFileSync('./users.json'));

// Get user with ID from the request
const findUser = (id) => users.find((u) => u.id == id);
const findUserIndex = (id) => users.findIndex((u) => u.id == id);

// ===================================================

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
  const user = findUser(req.params.id);

  // Check if user exists
  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  const user = findUser(req.params.id);

  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });

  const { username, email, password } = req.body;
  const userIdx = findUserIndex(req.params.id);

  // Update user data
  if (username) users[userIdx].username = username;
  if (email) users[userIdx].email = email;
  if (password) users[userIdx].password = password;

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  res.status(200).json({
    status: 'success',
    data: {
      user: users[userIdx],
    },
  });
};

exports.deleteUser = (req, res) => {
  const user = findUser(req.params.id);

  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });

  // Update users file without the selected user
  fs.writeFileSync(
    'users.json',
    JSON.stringify(
      users.filter((u) => u !== user),
      null,
      2
    )
  );

  res.status(200).json({
    status: 'success',
    data: null,
  });
};
