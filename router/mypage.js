const express = require('express');
const router = express.Router();
// const { Users} = require("../models");

const auth = require('../middlewares/auth');
const {Users} = require('../models');//데이터베이스에서 유저를 조회

//유저프로필 정보조회
router.get('/profile/:userId', auth, async (req, res) => {
    try { 
     const { userId } = req.params;
     const user = await Users.findOne({ where: { userId } });

     if (!user) {
        // 유저가 존재하지 않는 경우
        return res.status(404).json({ errorMessage: "유저를 찾을 수 없습니다." });
      }

      return res.status(200).json({ data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: "오류입니다 다시 시도해주세요." });
    }
  });



module.exports = router;