const ClientError = require('../exception/ClientError');

/* eslint-disable */
const errorHandlers = (e, req, res, next) => {
  if (e instanceof ClientError) {
    return res.status(e.statusCode).json({
      status: 'fail',
      message: e.message,
    });
  }

  // error duplikat username
  if (e.code === '23505') {
    return res.status(400).json({
      status: 'fail',
      message: 'Username sudah digunakan.',
    });
  }

  // error tak terduga
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami.',
  });
};

module.exports = errorHandlers;
