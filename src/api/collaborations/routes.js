const express = require('express');
const router = express.Router();

const controller = require('./controller');
const auth = require('../../middleware/auth');

router.post('/', auth, controller.postCollaborationController);
router.delete('/', auth, controller.deleteCollaborationController);

module.exports = router;
