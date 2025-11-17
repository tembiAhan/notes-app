// Import utils
const asyncHandler = require('../../utils/asyncHandler');

// Import validator
const { validatePayload } = require('./validator');

// Import service
const {
  collaborationsService,
  notesService,
} = require('../../service/postgre');

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
