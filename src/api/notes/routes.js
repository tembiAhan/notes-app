const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const controller = require('./controller');

router.post('/', auth, controller.postNoteController);
router.get('/', controller.getNotesController);
router.get('/:id', controller.getNoteByIdController);
router.put('/:id', auth, controller.putNoteByIdController);
router.delete('/:id', auth, controller.deleteNoteByIdController);

module.exports = router;
