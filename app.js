const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();
const port = 4000;
const { SECRET_KEY } = process.env;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const indexRouter = require('./router/index.js');

const path = require('path');
app.set('view engine', 'pug'); // pug를 사용한다는 설정
app.set('views', path.join(__dirname, 'views')); // pug 경로 설정

app.use(express.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', indexRouter);
app.listen(port, () => {
  console.log(port, '번 포트로 서버가 실행되었습니다.');
});
