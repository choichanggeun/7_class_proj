const express = require('express');
const router = express.Router();
const { Reservation, Reviews } = require('../models');
const auth  = require('../middlewares/auth');

//리뷰 작성하기
router.post(':reservationId/createdReviews', auth, async (req, res) => {
  const { userValid } = res.locals.user;
  const { reservationId } = req.params;

  if (!userValid) {
    res.status(401).json({ message: '로그인이 필요합니다.' });
    return;
  }
  const foundReservation = await Reservation.findOne({ where: { reservationId } });
  if (!foundReservation) {
    return res.status(400).json({ erorMessage: '예약이 존재하지 않습니다.' });
  }

  const { title, content } = req.body;
  const createdReview = await Reviews.create({
    ReservationId: reservationId,
    title,
    content
  });
  return res.status(200).json({ data: createdReview });
});

   /*  const { title, content, rating } = req.body;
    const createdReview = await Reviews.create({
        ReservationId: reservationId,
        title,
        content,
        rating  })*/

//전체 리뷰 불러오기
router.get('/allReview', auth, async (req, res) => {
  try {
    const allReview = await Reviews.findAll({
      include: { model: Reservation , attributes:['reservationId'] },
      attributes: ['reservationId ', 'reviews', 'title', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });
    if (!allReview.length) {
      return res.status(400).json({
        errorMessage: '존재하지 않는 리뷰입니다.',
      });
    }
    res.status(200).json({ data: allReview });
  } catch (error) {
    res.status(400).json({
      errorMessage: '리뷰 조회에 실패 하였습니다.',
    });
  }
});

//특정 리뷰 불러오기
router.get('/:reviewId', auth, async (req, res) => {
  const { reviewId } = req.params;

  const oneReviews = await Reviews.findOne({
    attributes: ["reviewId", "title", "content", "createdAt", "updatedAt"],
    where: { reviewId },
  });
  return res.status(200).json({ data: oneReviews  });
});

//리뷰 정보 수정
router.put('/:reveiwID', auth, async (req, res) => {
const { reviewId } = req.params;
const { title, content } = req.body;

try {
const review = await review.findOne({ where: { reviewId } });

if (!review) {
res.status(404).json({ message: '리뷰 정보가 존재하지 않습니다.' });
return;
}

await review.update({
content,
title
});

res.status(200).json({ message: '리뷰 변경이 완료 되었습니다.' });
} catch (error) {
console.log(error);
res.status(500).json({ message: error });
}
});

// 리뷰 삭제
router.delete('/:reviewId', auth, async (req, res) => {
const { reviewId } = req.params;

try {
const review = await review.findOne({ where: { reviewId } });

if (!review) {
res.status(404).json({ message: '리뷰가 존재하지 않습니다.' });
return;
}

await review.destroy();

res.status(200).json({ message: '리뷰 삭제가 완료 되었습니다.' });
} catch (error) {
console.log(error);
res.status(500).json({ message: error });
}
});

module.exports = router;