const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');

require("dotenv").config();
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use("/", indexRouter);

app.listen(3030, () => {
    console.log("server is running on port 3030");
})