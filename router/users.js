const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

module.exports = router;