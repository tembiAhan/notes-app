const express = require('express');
const router = express.Router();

const NotesService = require('../../service/postgre/NotesService');
const NotesController = require('./notesController');
const { validatePayload } = require('./validator');

const service = new NotesService();
const controller = new NotesController(service, { validatePayload });

router.post('/', controller.postNote);
router.get('/', controller.getNotes);
router.get('/:id', controller.getNoteById);
router.put('/:id', controller.putNoteById);
router.delete('/:id', controller.deleteNoteById);

module.exports = router;
