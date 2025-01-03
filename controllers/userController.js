const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// ===================================================

const users = JSON.parse(fs.readFileSync('./users.json')); // Get users as an array of objects
const findUser = (id) => users.find((u) => u.id == id); // Get user with ID from the request
const findUserIndex = (id) => users.findIndex((u) => u.id == id);

// A function for token generation
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ===================================================

// ====================== SIGN UP ======================
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if data is provided
  if (!(username && email && password)) {
    let errors = [];

    if (!username) errors.push('a username');
    if (!email) errors.push('an email');
    if (!password) errors.push('a password');

    return res.status(400).json({
      status: 'fail',
      // Error message example: Please provide a username, an email, a password
      message: `Please provide ${errors.join(', ')}`,
    });
  }

  // Check if username or email exists
  if (users.find((u) => u.username === username || u.email === email)) {
    let errors = [];

    if (users.find((u) => u.username === username)) errors.push('username');
    if (users.find((u) => u.email === email)) errors.push('email');

    return res.status(400).json({
      status: 'fail',
      message: `${errors.join(' and ')} already exist${
        errors.length > 1 ? '' : 's'
      }`,
    });
  }

  // Check if password is long enough
  if (password.length < 8)
    return res.status(400).json({
      status: 'fail',
      message: `Please provide a password with or longer than 8 characters`,
    });

  let maxId = 0;
  if (users.length > 0) {
    maxId = Math.max(...users.map((u) => u.id));
  }

  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = {
    id: maxId + 1,
    username,
    email,
    password: hashedPassword,
  };

  users.push(user);

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  const token = signToken(user.id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
// =====================================================

// ======================= LOGIN =======================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if data is provided
  if (!(email && password)) {
    let errors = [];

    if (!email) errors.push('an email');
    if (!password) errors.push('a password');

    return res.status(400).json({
      status: 'fail',
      message: `Please provide ${errors.join(' and ')}`,
    });
  }

  const user = users.find((u) => u.email === email);

  // Check if email and password are valid
  if (!(user && (await bcrypt.compare(password, user.password))))
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password',
    });

  const token = signToken(user.id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
// =====================================================

// =================== GET ALL USERS ===================
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
// =====================================================

// ================= GET A SINGLE USER =================
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
// =====================================================

// ================= UPDATE USER DATA ==================
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
// =====================================================

// ==================== DELETE USER ====================
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
// =====================================================
