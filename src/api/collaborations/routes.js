const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/', controller.postCollaborationController);
router.delete('/', controller.deleteCollaborationController);

module.exports = router;
