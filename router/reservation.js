const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Reservations } = require('../models');

// 예약 등록
router.post('/', auth, async (req, res) => {
  const { startDate, endDate, petSitter, petInfoId } = req.body;
  const { userId: UserId } = res.locals.user;
  // 로그인 여부 확인
  if (!req.user) {
    res.status(401).json({ message: '로그인이 필요합니다.' });
    return;
  }

  try {
    const reservation = await Reservations.create({
      UserId,
      PetInfoId: petInfoId,
      startDate: startDate,
      endDate: endDate,
      petSitter: petSitter,
    });

    res.status(201).json({
      reservation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '오류입니다.',
    });
  }
});

// 예약 정보 조회
router.get('/:reservationId', auth, async (req, res) => {
  const { reservationId } = req.params;
  const user = req.user;

  try {
    const reservation = await Reservations.findOne({
      where: {
        reservationId,
        UserId: user.userId,
      },
    });

    if (!reservation) {
      res.status(404).json({
        message: '예약 정보를 찾지 못했습니다.',
      });
      return;
    }

    res.status(200).json({
      reservation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '서버 오류입니다.',
    });
  }
});

// 예약 정보 수정
router.put('/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  const { startDate, endDate, petSitter } = req.body;

  try {
    const reservation = await Reservations.findOne({ where: { reservationId } });

    if (!reservation) {
      res.status(404).json({ message: '예약 정보가 존재하지 않습니다.' });
      return;
    }

    await reservation.update({
      startDate,
      endDate,
      petSitter,
    });

    res.status(200).json({ message: '예약 변경이 완료 되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// 예약 삭제
router.delete('/:reservationId', async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservations.findOne({ where: { reservationId } });

    if (!reservation) {
      res.status(404).json({ message: '예약 정보가 존재하지 않습니다.' });
      return;
    }

    await reservation.destroy();

    res.status(200).json({ message: '예약 삭제가 완료 되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
