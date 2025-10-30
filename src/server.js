require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notesRouter = require('./api/notes/routes');
const usersRouter = require('./api/users/routes');
const ClientError = require('./exception/ClientError');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

// Middleware error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  // Kalau error memiliki statusCode 400 (Bad Request)
  if (err.statusCode === 400) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err.code === '23505') {
    return res.status(400).json({
      status: 'fail',
      message: 'Username sudah digunakan.',
    });
  }

  // Error tak terduga
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami.',
  });
});

const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
