const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const myPageRouter = require('./mypage.js');
const petsRouter = require('./pets.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js');
const revRouter = require('./reservation.js');

router.use('/reviews', reviewsRouter);
router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use('/reservation', auth, revRouter);
router.use('/mypage', myPageRouter);

module.exports = router;
