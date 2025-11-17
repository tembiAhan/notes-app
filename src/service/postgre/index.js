const { Pool } = require('pg');
const AuthenticationsService = require('./AuthenticationsService');
const CollaborationsService = require('./collaborationsService');
const NotesService = require('./NotesService');
const UsersService = require('./UsersService');

const pool = new Pool();

const authenticationsService = new AuthenticationsService(pool);
const collaborationsService = new CollaborationsService(pool);
const notesService = new NotesService(pool, collaborationsService);
const usersService = new UsersService(pool);

module.exports = {
  authenticationsService,
  collaborationsService,
  notesService,
  usersService,
};
