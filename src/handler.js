const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, body, tags } = request.payload;
  const id = nanoid(10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { title, body, tags, id, createdAt, updatedAt };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);
};

const getAllNotesHandler = () => {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  return h
    .response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, body, tags } = request.payload;
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

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }
  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui catatan, id tidak ditemukan',
    })
    .code(400);
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);
  }
  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal dihapus, id tidak ditemukan',
    })
    .code(400);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
