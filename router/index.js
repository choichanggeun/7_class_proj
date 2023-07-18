const express = require("express");
const router = express.Router();

const myPageRouter = require("./myPage.js");
const petInfoRouter = require("./petInfos.js");
const usersRouter = require("./users.js");
const reviewsRouter = require("./reviews.js");
const revRouter = require("./reservation.js");

router.use("/reviews", reviewsRouter);
router.use("/petInfo", petInfoRouter);
router.use("/users", usersRouter);
router.use("/reservation", revRouter);
router.use("/myPage", myPageRouter);

module.exports = router;
