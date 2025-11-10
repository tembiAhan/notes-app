const { validatePayload } = require('./validator');
const NotesService = require('../../service/postgre/NotesService');
const notesService = new NotesService();

const postNoteController = async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
};

const getNotesController = async (req, res, next) => {
  try {
    const notes = await notesService.getNotes();
    res.status(200).json({
      status: 'success',
      data: {
        notes,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getNoteByIdController = async (req, res, next) => {
  try {
    const note = await notesService.getNoteById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        note,
      },
    });
  } catch (e) {
    next(e);
  }
};

const putNoteByIdController = async (req, res, next) => {
  try {
    validatePayload(req.body);
    await notesService.editNoteById(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  } catch (e) {
    next(e);
  }
};

const deleteNoteByIdController = async (req, res, next) => {
  try {
    await notesService.deleteNoteById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postNoteController,
  getNotesController,
  getNoteByIdController,
  putNoteByIdController,
  deleteNoteByIdController,
};
