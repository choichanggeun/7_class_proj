const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Reservations, Pets, PetSitters, Users } = require('../models');

// 예약 등록
router.post('/', auth, async (req, res) => {
  const { startDate, endDate, petId, petSitterId } = req.body;
  const userValid = res.locals.user;

  // 로그인 여부 확인
  if (!userValid) {
    res.status(401).json({ message: '로그인이 필요합니다.' });
    return;
  }

  // 입력받은 petId의 값을 petName으로 변경하고 데이터베이스에서 조회합니다
  const pet = await Pets.findOne({ where: { petName: petId, UserId: req.user.userId } });

  if (!pet) {
    res.status(404).json({ message: '유효한 펫 아이디를 찾지 못했습니다.' });
    return;
  }

  // PetSitterId 검사를 추가했습니다.
  const petSitter = await PetSitters.findOne({ where: { petSitterId } });

  if (!petSitter) {
    res.status(404).json({ message: '유효한 펫 시터 아이디를 찾지 못했습니다.' });
    return;
  }

  try {
    const reservation = await Reservations.create(
      {
        UserId: req.user.userId,
        PetId: pet.petId,
        PetSitterId: petSitterId, // 유효한 Pets.petId를 사용했습니다.
        startDate: startDate,
        endDate: endDate,
      },
      {
        include: Pets,
      }
    );

    res.status(201).json({
      reservation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '예약 오류입니다.',
    });
  }
});
//petSitter,pets 조회
router.get('/', auth, async (req, res, next) => {
  try {
    // petSitters 데이터를 가져옵니다 (예: 데이터베이스에서 조회)
    const petSitters = await PetSitters.findAll();
    const pets = await Pets.findAll({ where: { UserId: req.user.userId } });

    res.render('reservation', { pageTitle: 'reservation', petSitters, pets });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자의 모든 예약 확인
router.get('/me', auth, async (req, res, next) => {
  try {
    const { userId: UserId } = req.user;

    const userReservations = await Reservations.findAll({
      include: [{ model: Pets }, { model: Users }, { model: PetSitters }],
      where: { UserId },
      order: [['startDate', 'DESC']],
    });

    res.json({ userReservations });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

//myPage PetSitterName API요청 처리

router.get('/getSitterName', auth, async (req, res) => {
  try {
    const { userId } = req.user;

    // Reservation 테이블에서 petSitterId를 찾습니다.
    const reservationInfo = await Reservations.findOne({
      where: { UserId: userId },
      attributes: ['PetSitterId'],
    });

    if (!reservationInfo) {
      res.status(404).json({ message: '예약 정보를 찾을 수 없습니다.' });
      return;
    }

    const petSitterId = reservationInfo.PetSitterId;
    const petSitter = await PetSitters.findOne({ where: { petSitterId } });

    if (!petSitter) {
      res.status(404).json({ message: '해당 펫이 없습니다.' });
      return;
    }
    const sitterNick = petSitter.sitterName;
    res.status(200).json({ sitterNick });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

router.get('/getDate', auth, async (req, res) => {
  try {
    const { userId } = req.user;

    // 해당 사용자의 예약 정보를 가져옵니다.
    const reservationDate = await Reservations.findOne({
      where: { UserId: userId },
      attributes: ['startDate', 'endDate'],
    });

    if (!reservationDate) {
      res.status(404).json({ message: '예약 정보를 찾을 수 없습니다.' });
      return;
    }

    const startDate = reservationDate.startDate;
    const endDate = reservationDate.endDate;
    res.status(200).json({ startDate, endDate });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});
// 예약 정보 조회
router.get('/:reservationId', auth, async (req, res) => {
  const reservationId = req.params.reservationId;
  const user = req.user;

  try {
    const reservation = await Reservations.findOne({
      where: {
        reservationId,
        UserId: user.userId,
      },
      include: [
        {
          model: Pets,
        },
      ],
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
router.put('/:reservationId', auth, async (req, res) => {
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
router.delete('/:reservationId', auth, async (req, res) => {
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
