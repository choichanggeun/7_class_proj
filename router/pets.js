const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Pets, Reservations, Users } = require('../models');

// 펫 등록
router.post('/', auth, async (req, res) => {
  const { petName, petGender, petAge } = req.body;
  const userValid = res.locals.user;
  console.log(req.body);
  // 로그인 여부 확인
  if (!userValid) {
    res.status(401).json({ message: '로그인이 필요합니다.' });
    return;
  }

  try {
    const pet = await Pets.create({
      UserId: req.user.userId,
      petName: petName, // 수정된 부분
      petGender: petGender, // 수정된 부분
      petAge: petAge,
    });
    res.status(201).json({
      message: '펫 등록에 성공하였습니다',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '오류입니다.',
    });
  }
});

// /api/pets/:pietId
// /api/pets/3
// 펫 정보 조회
router.get('/me', auth, async (req, res) => {
  const user = req.user;

  try {
    const pet = await Pets.findAll({
      where: {
        UserId: user.userId,
      },
    });

    if (!pet) {
      res.status(404).json({
        message: '펫 정보를 찾지 못했습니다.',
      });
      return;
    }

    res.status(200).json({
      pet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '서버 오류입니다.',
    });
  }
});

//mypage.pug 에서 petName 가져옴
router.get('/getPetName', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const pet = await Pets.findOne({ where: { UserId: userId } });

    if (!pet) {
      res.status(404).json({ message: '해당 펫이 없습니다.' });
      return;
    }
    const petName = pet.petName; //
    res.status(200).json({ petName });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

// 펫 정보 수정
router.put('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const { petName, petAge, petGender } = req.body;

  try {
    const pet = await Pets.findOne({ where: { petId } });

    if (!pet) {
      res.status(404).json({ message: '펫 정보가 존재하지 않습니다.' });
      return;
    }

    await pet.update({
      petName,
      petAge,
      petGender,
    });

    res.status(200).json({ message: '펫 변경이 완료 되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// 예약 삭제
router.delete('/:petId', auth, async (req, res) => {
  const { petId } = req.params;

  try {
    const pet = await Pets.findOne({ where: { petId } });

    if (!pet) {
      res.status(404).json({ message: '펫 정보가 존재하지 않습니다.' });
      return;
    }

    await pet.destroy();

    res.status(200).json({ message: '펫 삭제가 완료 되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
