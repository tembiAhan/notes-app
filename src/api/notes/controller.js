const asyncHandler = require('../../utils/asyncHandler');
const { validatePayload } = require('./validator');
const NotesService = require('../../service/postgre/NotesService');
const notesService = new NotesService();

const postNoteController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { title = 'untitled', body, tags } = req.body;
  const { userId } = req;
  const noteId = await notesService.addNote({
    title,
    body,
    tags,
    owner: userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId,
    },
  });
});

const getNotesController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const notes = await notesService.getNotes(id, userId);
  res.status(200).json({
    status: 'success',
    data: {
      notes,
    },
  });
});

const getNoteByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  await notesService.verifyNoteOwner(id, userId);
  const note = await notesService.getNoteById(id);

  res.status(200).json({
    status: 'success',
    data: {
      note,
    },
  });
});

const putNoteByIdController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { id } = req.params;
  const { userId } = req;

  await notesService.verifyNoteOwner(id, userId);
  await notesService.editNoteById(id, req.body);

  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
});

const deleteNoteByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  await notesService.verifyNoteOwner(id, userId);
  await notesService.deleteNoteById(id);

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
