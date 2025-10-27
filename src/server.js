require('dotenv').config();
const express = require('express');
const notesRouter = require('./api/notes/routes');
const ClientError = require('./exception/ClientError');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'POST,GET,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/notes', notesRouter);

// Middleware error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  console.error(err);

  // Kalau error memiliki statusCode 400 (Bad Request)
  if (err.statusCode === 400) {
    return res.status(400).json({
      status: 'fail',
      message: err.message || 'Permintaan tidak valid.',
    });
  }
  console.error(err);

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
