const express = require('express');
const supabase = require('../utils/supa.js');
const router = express.Router();

router.get('/', async function (req, res, next) {
    const {data, error} = await supabase.from('ice_res').select().eq("status", "결제완료");
    res.render('cleaner/index', {title: 'Cleaner', reservation: data});
})

module.exports = router;