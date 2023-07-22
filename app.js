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

// public 디렉토리를 정적 파일 제공을 위한 디렉토리로 설정
app.use(express.static(path.join(__dirname, 'public')));//버플릭키준다 

app.use(express.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    // 세션을 DB 나 파일로 저장 하면 서버가 껐다 켜져도 유지가 된다.
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
