const asyncHandler = require('../../utils/asyncHandler');
const { validatePayload } = require('./validator');
const NotesService = require('../../service/postgre/NotesService');
const notesService = new NotesService();

const postNoteController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { title = 'untitled', body, tags } = req.body;
  const noteId = await notesService.addNote({ title, body, tags });

  res.status(201).json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId,
    },
  });
});

const getNotesController = asyncHandler(async (req, res) => {
  const notes = await notesService.getNotes();
  res.status(200).json({
    status: 'success',
    data: {
      notes,
    },
  });
});

const getNoteByIdController = asyncHandler(async (req, res) => {
  const note = await notesService.getNoteById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      note,
    },
  });
});

const putNoteByIdController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  await notesService.editNoteById(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
});

const deleteNoteByIdController = asyncHandler(async (req, res) => {
  await notesService.deleteNoteById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });
});

module.exports = {
  postNoteController,
  getNotesController,
  getNoteByIdController,
  putNoteByIdController,
  deleteNoteByIdController,
};
