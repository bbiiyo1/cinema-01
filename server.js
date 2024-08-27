const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, authenticateUser } = require('./models/userModel');

const userRoutes = require('./../routes/userRoutes');




const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// 회원가입 엔드포인트
app.post('/signup', (req, res) => {
  const userData = req.body;

  bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('비밀번호 해싱 오류:', err);
      return res.status(500).json({ message: '회원가입에 실패했습니다.' });
    }

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    createUser(newUser, (err, results) => {
      if (err) {
        console.error('회원가입 오류:', err);
        return res.status(500).json({ message: '회원가입에 실패했습니다.' });
      }
      res.status(201).json({ message: '회원가입 성공!' });
    });
  });
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { userid, password } = req.body;

  authenticateUser(userid, (err, user) => {
    if (err) {
      console.error('사용자 인증 오류:', err);
      return res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
    }

    if (user && bcrypt.compareSync(password, user.passwd)) {
      const token = jwt.sign({ userid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: '로그인 성공', token });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행되고 있습니다.`);
});
