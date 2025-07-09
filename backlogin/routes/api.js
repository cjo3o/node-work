const express = require('express');
const router = express.Router();
const supabase = require('../database/db');
const bcrypt = require('bcrypt');

const client_id = process.env.KAKAO_CLIENT_ID;
const redirect_uri = process.env.KAKAO_REDIRECT_URI;
const client_secret = process.env.KAKAO_CLIENT_SECRET;

router.post('/login', async (req, res) => {
  const {id, password} = req.body;

  const {data, error} = await supabase.from('member').select()
    .eq('id', id);
  const sendData = {};

  if (data.length > 0) {
    // admin라는 계정 존재 O
    // 비밀번호 같은지 확인 bcrypt 암호화 임으로 compare 함수로 비교

    console.log('password', password);
    console.log('data[0].pw', data[0].pw);
    console.log('비교암호', bcrypt.compare(password.trim(), data[0].pw));

    if (await bcrypt.compare(password.trim(), data[0].pw)) {
      // 비밀번호 같으면
      sendData.flag = 'success';
      sendData.message = '로그인하였습니다.';
      req.session.user = {id: data[0].id, addr: data[0].addr}
      res.json(sendData);
    } else {
      // 비밀번호 틀리면
      sendData.flag = 'error';
      sendData.message = '비밀번호가 틀렸습니다.';
      res.status(401).json(sendData);
    }
  } else {
    // admin라는 계정 존재 X
    sendData.flag = "fail";
    sendData.message = "아이디와 비밀번호를 확인하세요";
    res.status(401).json(sendData);
  }

})

router.get('/me', async (req, res) => {
  if (req.session.user) {
    res.json({status: true, user: req.session.user});
  } else {
    res.json({status: false});
  }
});

router.post('/logout', async (req, res) => {
  req.session.destroy(
    ()=>{
      res.clearCookie('connect.sid');
      res.json({status: false});
    }
  );
});

router.get('/kakaologin', (req, res) => {
  res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`);
})

module.exports = router;