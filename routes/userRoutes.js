// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController'); // 사용자 컨트롤러를 가져옵니다

// 회원가입 요청 처리
router.post('/signup', userController.signupUser); // POST 요청을 userController의 signupUser 함수로 처리

// 로그인 요청 처리
router.post('/login', userController.loginUser);

module.exports = router;