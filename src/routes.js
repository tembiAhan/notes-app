const express = require('express');
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = express.Router();

routes.post('/', addNoteHandler);
routes.get('/', getAllNotesHandler);
routes.get('/:id', getNoteByIdHandler);
routes.put('/:id', editNoteByIdHandler);
routes.delete('/:id', deleteNoteByIdHandler);

module.exports = routes;
