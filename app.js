const express = require('express');
const app = express();
const port = 4000;

//dotenv.config();
require('dotenv').config();

const rdsUsername = process.env.RDS_USERNAME;
const rdsPassword = process.env.RDS_PASSWORD;
const rdsHost = process.env.RDS_HOST;
const rdsPort = process.env.RDS_PORT;

const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const indexRouter = require('./router/index.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', indexRouter);

app.listen(port, () => {
  console.log(port, '번 포트로 서버가 실행되었습니다.');
});
