const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, res) => {
  const { title, body, tags } = req.body;
  const id = nanoid(10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { title, body, tags, id, createdAt, updatedAt };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
};

const getAllNotesHandler = (req, res) => {
  return res.json({
    status: 'success',
    data: {
      notes,
    },
  });
};

const getNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return res.status(200).json({
      status: 'success',
      data: {
        note,
      },
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
};

const editNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      body,
      tags,
      updatedAt,
    };

    return res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  }
  return res.status(400).json({
    status: 'fail',
    message: 'Gagal memperbarui catatan, id tidak ditemukan',
  });
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  }
  return res.status(400).json({
    status: 'fail',
    message: 'Catatan gagal dihapus, id tidak ditemukan',
  });
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
