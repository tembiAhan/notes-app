const asyncHandler = require('../../utils/asyncHandler');

class NotesController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postNote = asyncHandler(async (req, res) => {
    this._validator.validatePayload(req.body);
    const { title = 'untitled', body, tags } = req.body;
    const noteId = await this._service.addNote({ title, body, tags });

    res.status(201).json({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
  });

  getNotes = async (req, res) => {
    const notes = await this._service.getNotes();
    res.status(200).json({
      status: 'success',
      data: {
        notes,
      },
    });
  };

  getNoteById = asyncHandler(async (req, res) => {
    const note = await this._service.getNoteById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        note,
      },
    });
  });

  putNoteById = asyncHandler(async (req, res) => {
    this._validator.validatePayload(req.body);
    await this._service.editNoteById(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  });

  deleteNoteById = asyncHandler(async (req, res) => {
    await this._service.deleteNoteById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  });
}

module.exports = NotesController;
