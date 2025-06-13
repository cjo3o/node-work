const express = require('express');
const router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/checkout', async function (req, res, next) {
    console.log(req.query);

    const {data, error} = await supabase.from('ice_res').select().eq('res_no', req.query.resNo);
    console.log(data);

    res.render('pay/checkout', {title: "예약내역결제", reservation: data[0]});
});

router.get('/success', async function (req, res, next) {
    console.log(req.query);
    supabase.from('ice_res').update({status:"결제완료"}).eq("res_no", req.query.orderId);
    const {data} = await supabase.from('ice_res').select().eq('res_no', req.query.orderId);
    return res.render('pay/success', {reservation: data[0]});
});

module.exports = router;