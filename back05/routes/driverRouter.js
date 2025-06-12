const express = require("express");
const supabase = require("../config/supa.js");

router = express.Router();

router.route("")
    .get(async (req, res, next) => {

        const {data, error} = await supabase.from('ice_res').select();

        res.render('driver', {data});
    })
    .post(async (req, res, next) => {
        console.log(req.body);
        return res.send("저장됨");
    });

module.exports = router;