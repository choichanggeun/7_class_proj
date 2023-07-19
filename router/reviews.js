const express = require('express');
const router = express.Router();
const { UserId, ReservationId, PetInfoId, Reviews } = require('../models');

const authMiddleware = require('../middlewares/auth');
 //전체 리뷰 불러오기
router.get('/reservations/reviews', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        return res.status(201).json({ reviews: await Reviews.findAll({ where: { reservationId: ReservationId }})})
    } catch (err) {
        return res.status(404).json({ errmessage: '전제 리뷰 불러오기에 실패했습니다.'})
    }
})
    //특정 리뷰 불러오기
router.get('/reservations/:resevationId/reviews', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        return res.status(201).json({ reviews: await Reviews.findOne({ where: { reservationId: ReservationId }})})
    } catch (err) {
        return res.status(404).json({ errmessage: '리뷰 불러오기에 실패했습니다.'})
    }
})

    //리뷰 삭제하기
router.delete('/reservations/:resevationId/reviews', authMiddleware, async (req, res) => {
    const { reservationId } = req.params; 
    const { userId } = res.locals;
    try {
       const reviews = await Reviews.findOne({ where: { reservationId}})
       if (!reviews) {
        res.status(404).json({ errMessage: "리뷰가 존재하지 않습니다." })
       } else {
        if (reviews !== reviews.reservationId) {
            res.status(404).json({ errMessage: "리뷰 삭제 권한이 존재하지 않습니다."})
        } else if (reviews.reservationId === userId ) {
            await Reviews.deleteOne({ id: ReservationId })
            res.status(200).json({ message: "리뷰 삭제가 됬습니다."})
        } 
       }
    } catch (err) {
        res.status(404).json({ errMessage: "리뷰 삭제가 실패했습니다."})
    }
})
    //리뷰 작성하기
router.post('/reservations/:reservationId/reviews', authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { reservationId } = req.params;
    const { review } = req.body;

    try {
        const review = await user.findOne({ where: { userId }})
        
        if(!reservation)
        { return res.status(400).json({ errMessage: "예약이 존재하지 않습니다."})}
    
        const newreview = await Reviews.create( {
            ReservationId: reservationId,
            UserId: userId,
            review
        })
        return res.status(200).json({ message: "리뷰가 작성됬습니다."})
    } catch (error) {
        return res.status(400).json({ erroMessage: "리뷰 작성이 실패했습니다." })
    }

})

//리뷰 수정, 별점 기능 구현
router.patch('/reservations/:resevationId/reviews', authMiddleware, async (req, res) => {
    
}) 

module.exports = router