const { nanoid } = require('nanoid');
const data = require('./data');

const addNoteHandler = (request, h) => {
  const { title, body, tags } = request.payload;
  const id = nanoid(10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { title, body, tags, id, createdAt, updatedAt };

  data.push(newNotes);

  const isSuccess = data.filter((note) => note.id === id).length > 0;

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
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => {
  return {
    status: 'success',
    data: {
      data,
    },
  };
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = data.filter((note) => note.id === id)[0];

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

  const notes = data.findIndex((note) => note.id === id);

  if (notes !== -1) {
    data[notes] = {
      ...data[notes],
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

  const note = data.findIndex((note) => note.id === id);

  if (note !== -1) {
    data.splice(note, 1);
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
