const express = require('express');

router = express.Router();

router.get('/',(req,res,next)=>{
    console.log("user Router 동작");
    res.send("정상");
})

router.get('/aa',(req,res,next)=>{
    console.log("user aa 동작");
    res.send("aa 정상")
})

module.exports = router;