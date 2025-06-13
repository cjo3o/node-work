var express = require('express');
var router = express.Router();
const supabase = require('../utils/supa.js');

/* GET home page. */
router.get('/', async function (req, res, next) {

  console.log("여기오나");
  // 예약 리스트 가져오기
  const result = await supabase.from('ice_res').select();
  console.log(result);

  res.render('index', {title: 'Express'});
});

module.exports = router;