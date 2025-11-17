require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');

// Import routes
const notesRouter = require('./api/notes/routes');
const usersRouter = require('./api/users/routes');
const authenticationsRouter = require('./api/authentications/routes');
const collaborationsRouter = require('./api/collaborations/routes');

// Import middlewares
const errorHandlers = require('./middleware/errorHandlers');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/authentications', authenticationsRouter);
app.use('/collaborations', collaborationsRouter);

// Middleware error handler
app.use(errorHandlers);

module.exports = app;
