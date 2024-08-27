const userModel = require('../models/userModel'); // userModel.js 파일을 import
const bcrypt = require('bcrypt'); // 비밀번호 해싱용
const jwt = require('jsonwebtoken'); // JWT 토큰 생성용

const signupUser = (req, res) => {
  const userData = req.body;
  console.log('Received user data:', userData); // 사용자 데이터 콘솔에 출력

  userModel.createUser(userData, (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ message: '회원가입에 실패했습니다.' });
    }
    res.status(201).json({ message: '회원가입 성공', results });
  });
};

const loginUser = (req, res) => {
  const { userid, password } = req.body;

  userModel.authenticateUser(userid, (err, user) => {
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
};

module.exports = {
  signupUser,
  loginUser,
};
