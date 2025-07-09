var express = require('express');
var router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/', async function (req, res, next) {
    const {data, error} = await supabase.from('cleaner').select();
    res.render('admin', {cleaners: data});
});

module.exports = router;

router.post('/', async function (req, res, next) {
    const {name, email, phone, addr} = req.body;
    const {error} = await supabase.from('cleaner').insert({name, email, phone, "address": addr});

    if (error) {
        console.log("슈파베이스 등록시 에러 발생");
        console.log(error);
    }

    res.render('admin');
})