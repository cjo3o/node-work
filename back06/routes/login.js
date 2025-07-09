const express = require('express');
const router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', async function (req, res, next) {
    const {phone, password} = req.body;
    const {data, error} = await supabase
        .from('cleaner')
        .select()
        .eq('phone', phone)
        .single();
    console.log(data);
    if (data) {
        req.session.user = data;
        res.redirect('/');
    } else {
        res.render('login', {error: "핸드폰번호와 비밀번호를 확인하세요"});
    }

    res.redirect('/login');
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;