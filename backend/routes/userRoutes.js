// Defines the route:

// GET /api/users
const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');

router.get('/', getUser);

module.exports = router;
