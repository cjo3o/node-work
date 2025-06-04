const express = require("express");

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    console.log("freeboard Router GET 동작");
    res.end("freeboard Router GET");
  })
  .post((req, res, next) => {
    console.log("freeboard Router POST 동작");
    res.end("freeboard Router POST");
  })
  .put((req, res, next) => {
    console.log("freeboard Router PUT 동작");
    res.end("freeboard Router PUT");
  });

module.exports = router;
