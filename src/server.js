require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const notesRouter = require('./api/notes/routes');
const usersRouter = require('./api/users/routes');
const authenticationsRouter = require('./api/authentications/routes');

const ClientError = require('./exception/ClientError');

app.use(express.json());
app.use(cors());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/authentications', authenticationsRouter);

// Middleware error handler
// eslint-disable-next-line no-unused-vars
app.use((e, req, res, next) => {
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
  console.log(e);
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
