const express = require('express');
const router = express.Router();

const myPageRouter = require('./mypage.js');
const petInfoRouter = require('./petInfo.js');
const userRouter = require('./users.js');
const reviewRouter = require("./review.js");
const revRouter = require("./reservation.js");

router.use('/review', postRouter);
router.use('/petInfo', petInfoRouter);
router.use('/user', userRouter);
router.use('/rev', revRouter);
router.use('/mypage', myPageRouter);



module.exports = router;