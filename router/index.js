const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { PetSitters } = require('../database/data.js');

const petsRouter = require('./pets.js');
const usersRouter = require('./users.js');
const myPageRouter = require('./mypage.js');
const reviewsRouter = require('./reviews.js');
const reservationRouter = require('./reservation.js');

//메인 페이지
router.get('/', (req, res) => {
  res.render('home', { pageTitle: '칠면조' });
});

// // 회원가입
router.use('/api/users', usersRouter);
router.get('/users/signup', (req, res) => {
  res.render('signup', { pageTitle: 'signup' });
});

//로그인

router.get('/users/signin', (req, res) => {
  res.render('signin', { pageTitle: 'signin', session: req.session });
});

//마이 페이지
router.get('/mypage', (req, res) => {
  res.render('mypage', { pageTitle: '칠면조', pageTitle: 'signup' });
});

//펫 등록
router.use('/api/pets', auth, petsRouter);
router.get('/pets/', (req, res) => {
  res.render('pets', { pageTitle: '칠면조' });
});

// 예약
router.use('/api/reservation', reservationRouter);

router.get('/reservaiton', (req, res) => {
  res.render('reservation', { pageTitle: '칠면조' });
});

//리뷰 등록
router.use('/api/reviews', auth, reviewsRouter);
router.get('/reviews', (req, res) => {
  res.render('/reviews/posting', { pageTitle: '칠면조' });
});

router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use('/reservation', reservationRouter);
router.use('/mypage', myPageRouter);
router.use('/reviews', auth, reviewsRouter);
module.exports = router;
