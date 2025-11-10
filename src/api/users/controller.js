const { validatePayload } = require('./validator');
const UsersService = require('../../service/postgre/UsersService');
const userService = new UsersService();

const postUserController = async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { postUserController, getUserByIdController };
