const express = require('express');
const router = express.Router();

const myPageRouter = require('./myPage.js');
const petInfoRouter = require('./petInfo.js');
const usersRouter = require('./users.js');
const reviewRouter = require("./review.js");
const revRouter = require("./reservation.js");

router.use('/review', reviewRouter);
router.use('/petInfo', petInfoRouter);
router.use('/users', usersRouter);
router.use('/rev', revRouter);
router.use('/myPage', myPageRouter);



module.exports = router;