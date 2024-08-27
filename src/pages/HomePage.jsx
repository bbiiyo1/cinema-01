import React from 'react';
import Layout from './../Layout/Layout'; // 올바른 Layout 컴포넌트 경로로 수정
import './HomePage.css';

import Slider from 'react-slick';
import image_01 from './../assets/images/image_01.jpg';
import image_02 from './../assets/images/image_02.jpg';
import image_03 from './../assets/images/image_03.jpg';
import image_04 from './../assets/images/image_04.jpg';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
};

function HomePage() {
  return (
    <Layout>
      <div className="home-page">
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="/Movie">영화</a></li>
            <li><a href="/cinema">극장</a></li>
            <li><a href="/ticket">예매</a></li>
            <li><a href="/store">스토어</a></li>
          </ul>
        </nav>

        <div className="promo-container">
          <Slider {...sliderSettings}>
            <div><img src={image_01} alt="Promotion 1" className="image-slide" /></div>
            <div><img src={image_02} alt="Promotion 2" className="image-slide" /></div>
            <div><img src={image_03} alt="Promotion 3" className="image-slide" /></div>
            <div><img src={image_04} alt="Promotion 4" className="image-slide" /></div>
          </Slider>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="/Movie">무비차트</a></li>
            <li><a href="/cinema">상영예정작</a></li>
            <li><a href="/all-movies">전체보기</a></li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
}

export default HomePage;
