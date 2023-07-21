require('dotenv').config();
const crypto = require('crypto');
const { SECRET_KEY } = process.env;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { Users } = require('../models');
const { signInValidation, signUpValidation } = require('../middlewares/Validations/usersValidation');
const auth = require('../middlewares/auth');

router.post('/signin', signInValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');

    const userValid = await Users.findOne({
      where: { email: email, password: passwordToCrypto },
      attributes: { exclude: ['password'] },
    });

    if (!userValid) return res.status(412).json({ message: '아이디와 비밀번호가 일치하지 않습니다.' });
    else req.session.user = userValid;

    return res.status(201).json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(412).json({ message: '오류가 발생하였습니다.' });
    return res.status(201).redirect('../../');
  });
});

router.post('/signup', signUpValidation, async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword } = req.body;
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    const userValid = await Users.findOne({ where: { email: email } });
    if (userValid) return res.status(412).json({ message: '이미 가입된 이메일입니다.' });
    await Users.create({ email, nickname, password: passwordToCrypto });
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

// /api/users => 모든 유저 정보를
router.get('/', auth, async (req, res) => {
  try {
    const { userId } = req.session.user;
    const users = await Users.findAll({ where: { userId } });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

// /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const { userId } = req.session.user;
    const user = await Users.findOne({ where: { userId } });
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '오류가 발생하였습니다.' });
  }
});

module.exports = router;
