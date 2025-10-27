const ClientError = require('../../exception/ClientError');

class NotesController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  _handleError(e, res) {
    if (e instanceof ClientError) {
      return res.status(e.statusCode).json({
        status: 'fail',
        message: e.message,
      });
    }
    console.log(e);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kegagalan pada server kami',
    });
  }

  postNote = async (req, res) => {
    try {
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
    } catch (e) {
      this._handleError(e, res);
    }
  };

  getNotes = async (req, res) => {
    const notes = await this._service.getNotes();
    res.status(200).json({
      status: 'success',
      data: {
        notes,
      },
    });
  };

  getNoteById = async (req, res) => {
    try {
      const note = await this._service.getNoteById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          note,
        },
      });
    } catch (e) {
      this._handleError(e, res);
    }
  };

  putNoteById = async (req, res) => {
    try {
      this._validator.validatePayload(req.body);
      await this._service.editNoteById(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
    } catch (e) {
      this._handleError(e, res);
    }
  };

  deleteNoteById = async (req, res) => {
    try {
      await this._service.deleteNoteById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
    } catch (e) {
      this._handleError(e, res);
    }
  };
}

module.exports = NotesController;
