require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const notesRouter = require('./api/notes/routes');
const usersRouter = require('./api/users/routes');
const authenticationsRouter = require('./api/authentications/routes');
const collaborationsRouter = require('./api/collaborations/routes');

// Import middlewares
const errorHandlers = require('./middleware/errorHandlers');

app.use(express.json());
app.use(cors());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/authentications', authenticationsRouter);
app.use('/collaborations', collaborationsRouter);

// Middleware error handler
app.use(errorHandlers);

const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
