// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../pages/LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log('로그인 성공:', response.data);
      localStorage.setItem('token', response.data.token); // JWT를 로컬 스토리지에 저장
      navigate('/home'); // 로그인 성공 후 이동할 페이지
    } catch (error) {
      console.error('로그인 오류:', error.response ? error.response.data : error.message);
      setError(`로그인에 실패했습니다: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            required
          />
        </div>
        <button type="submit">로그인</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
