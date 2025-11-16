const asyncHandler = require('../../utils/asyncHandler');
const { validatePayload } = require('./validator');
const UsersService = require('../../service/postgre/UsersService');
const userService = new UsersService();

const postUserController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { username, password, fullname } = req.body;

  const userId = await userService.addUser({ username, password, fullname });
  res.status(201).json({
    status: 'success',
    message: 'User berhasil ditambahkan',
    data: {
      userId,
    },
  });
});

const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const getUserByUsernameController = asyncHandler(async (req, res) => {
  const { username = '' } = req.query;
  const users = await userService.getUserByUsername(username);

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
