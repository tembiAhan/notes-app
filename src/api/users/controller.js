// Import utils
const asyncHandler = require('../../utils/asyncHandler');

// Import validator
const { validatePayload } = require('./validator');

// Import service
const { usersService } = require('../../service/postgre');

const postUserController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { username, password, fullname } = req.body;

  const userId = await usersService.addUser({ username, password, fullname });
  res.status(201).json({
    status: 'success',
    message: 'User berhasil ditambahkan',
    data: {
      userId,
    },
  });
});

const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const getUserByUsernameController = asyncHandler(async (req, res) => {
  const { username = '' } = req.query;
  const users = await usersService.getUserByUsername(username);

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

module.exports = {
  postUserController,
  getUserByIdController,
  getUserByUsernameController,
};
