const express = require('express');
const router = express.Router();
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


  // 유저 프로필 정보 수정
router.put('/profile/:userId', auth, async (req, res) => {  //put
    try {
      const { userId } = req.params;
      const { nickname, email } = req.body;
  
      const updatedUser = await Users.update(
        { nickname, email },
        { where: { userId }, returning: true }
      );
  
      return res.status(200).json({ data: "수정성공했습니다." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: "수정에실패했습니다."});
    }
  });

  // 유저 프로필 정보 삭제//
router.delete('/profile/:userId', auth, async (req, res) => {//딜릿이 유저 프로필 정보를 삭제하는 코드
    try {
      const { userId } = req.params;

      const deletedUser = await Users.destroy({ where: { userId } });

      if (deletedUser === 0) { //deletedUser가 0인 경우 (유저를 찾지 못한)실패로 처리
        return res.status(404).json({ errorMessage: "유저를 찾을 수 없습니다. 삭제에 실패했습니다." });
      }

      return res.status(200).json({ data: "삭제에 성공했습니다." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: "삭제에 실패했습니다." });
    }
  });
      
module.exports = router;