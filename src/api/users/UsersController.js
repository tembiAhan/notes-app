const asyncHandler = require('../../utils/asyncHandler');

class UsersController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUsers = asyncHandler(async (req, res) => {
    this._validator.validatePayload(req.body);
    const { username, password, fullname } = req.body;
    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    res.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await this._service.getUserById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  });
}

module.exports = UsersController;
