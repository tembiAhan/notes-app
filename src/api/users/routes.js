const express = require('express');
const router = express.Router();

const UsersService = require('../../service/postgre/UsersService');
const UsersController = require('./UsersController');
const { validatePayload } = require('./validator');

const service = new UsersService();
const controller = new UsersController(service, { validatePayload });

router.post('/', controller.postUsers);
router.get('/:id', controller.getUserById);

module.exports = router;
