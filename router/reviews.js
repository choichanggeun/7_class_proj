const express = require('express');
const router = express.Router();
const { Reservation, Reviews } = require('../models');
const auth  = require('../middlewares/auth');

//리뷰 작성하기
router.post('/reservations/:reservationId/reviews', auth, async (req, res) => {
  const { reservationId } = req.params;

  const { title, content, rating, PetSitterId, UserId } = req.body;
  const createdReview = await Reviews.create({
    ReservationId: reservationId,
    title,
    content,
    rating,
    PetSitterId,
    UserId
  });
  return res.status(200).json({ data: createdReview });
});


//전체 리뷰 불러오기
router.get('/reviews', auth, async (req, res) => {
  try {
    const allReview = await Reviews.findAll({ });
    if (!allReview.length) {
      return res.status(400).json({
        errorMessage: '존재하지 않는 리뷰입니다.',
      });
    }
    res.status(200).json({ data: allReview });
  } catch (error) {
    res.status(400).json({
      errorMessage: error.message
    });
  }
});

//특정 리뷰 불러오기
router.get('/reviews/:reviewId', auth, async (req, res) => {
  try{
  const { reviewId } = req.params;
  const oneReview = await Reviews.findOne({ where: { reviewId } })
 /*  if (!oneReview.length) {
    return res.status(400).json({
      errorMessage: '존재하지 않는 리뷰입니다.',
    });
  } */
  res.status(200).json({ data: oneReview });  
  }catch (error) {
    res.status(400).json({ message: '리뷰 찾기가 실패 했습니다.'      
    });
  }
})

//리뷰 정보 수정
router.put('/reviews/:reviewId', auth, async (req, res) => {
const { reviewId } = req.params;
const { title, content, rating, PetSitterId, UserId } = req.body;

try {
const review = await review.findOne({ where: { reviewId } });

const rewriteReview = await Reviews.updated({
  title,
  content,
  rating,
  PetSitterId,
  UserId
});
return res.status(200).json({ data: rewriteReview });

/* res.status(200).json({ message: '리뷰 변경이 완료 되었습니다.' }); */
} catch (error) {
console.log(error);
res.status(500).json({  errorMessage: error.message });
}
});

// 리뷰 삭제
router.delete('/:reviewId', auth, async (req, res) => {
const { reviewId } = req.params;

try {
const reviewdelete = await Reviews.findOne({ where: { reviewId } });

/*if (!reviewId) {
res.status(404).json({ message: '리뷰가 존재하지 않습니다.' });
return;
} */

await reviewdelete.destroy();

res.status(200).json({ message: '리뷰 삭제가 완료 되었습니다.' });
} catch (error) {
console.log(error);
res.status(500).json({ message: '리뷰 삭제가 실패 했습니다.' });
}
});

module.exports = router;
