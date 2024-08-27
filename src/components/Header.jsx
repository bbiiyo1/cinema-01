import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <h1><a href="/">Movie Theater</a></h1>
        <ul className="nav-links">

          <li><a href="/login">로그인</a></li> {/* 경로 수정 */}
          <li><a href="/signup">회원가입</a></li> {/* 경로 수정 */}

          <li><a href="/Mypage">My페이지</a></li>
          <li><a href="/CS">고객센터</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;