const { validatePayload } = require('./validator');
const asyncHandler = require('../../utils/asyncHandler');
const CollaborationsService = require('../../service/postgre/collaborationsService');
const NotesService = require('../../service/postgre/NotesService');

const collaborationsService = new CollaborationsService();
const notesService = new NotesService(collaborationsService);

const postCollaborationController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { userId: owner } = req;
  const { noteId, userId } = req.body;

  await notesService.verifyNoteOwner(noteId, owner);
  const collaborationId = await collaborationsService.addCollaboration(
    noteId,
    userId
  );

  res.status(201).json({
    status: 'success',
    message: 'Kolaborasi berhasil ditambahkan',
    data: {
      collaborationId,
    },
  });
});

const deleteCollaborationController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { userId: owner } = req;
  const { noteId, userId } = req.body;

  await notesService.verifyNoteOwner(noteId, owner);
  await collaborationsService.deleteCollaboration(noteId, userId);

  res.status(200).json({
    status: 'success',
    message: 'Kolaborasi berhasil dihapus',
  });
});

module.exports = { postCollaborationController, deleteCollaborationController };
