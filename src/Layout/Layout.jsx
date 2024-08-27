// src/Layout/Layout.js
import React from 'react';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <main className="main-content">
        <div className="content-container">
          {children} {/* 자식 컴포넌트가 여기에 렌더링됩니다 */}
        </div>
      </main>
    </div>
  );
}

export default Layout;
