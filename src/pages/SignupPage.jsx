import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './../Layout/Layout';
import axios from './../axios/axios';
import './../pages/SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    userid: '',
    password: '',
    password2: '',
    birthday: '',
    mobile: '',
    region: '',
    nickname: '',
    favorite: [],
    tellecom: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'favorite') {
      if (checked) {
        setFormData({
          ...formData,
          favorite: [...formData.favorite, value],
        });
      } else {
        setFormData({
          ...formData,
          favorite: formData.favorite.filter((item) => item !== value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.favorite.length === 0) {
      setError('최소한 하나의 선호 장르를 선택해 주세요.');
      return;
    }

    try {
      const response = await axios.post('/signup', formData);
      console.log('회원가입 성공:', response.data);
      setCurrentStep(3); // 회원가입 완료 단계로 이동
    } catch (error) {
      console.error('회원가입 오류:', error.response ? error.response.data : error.message);
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !agreed) {
      alert('개인정보 수집 및 이용에 동의해야 다음 단계로 진행할 수 있습니다.');
      return;
    }
    if (currentStep < 2) { // 1단계에서만 다음 단계로 이동
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Layout>
      <div className="signup-page">
        <h2>회원가입</h2>
        <div className="step-indicator">
          <div className={`step ${currentStep === 1 ? 'active' : ''}`}>STEP 1</div>
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>STEP 2</div>
          <div className={`step ${currentStep === 3 ? 'active' : ''}`}>완료</div>
        </div>
        {currentStep === 1 && (
          <div className="privacy-policy">
            <h3>개인정보 수집 및 이용 목적</h3>
            <p>서비스 이용에 따른 본인식별 및 실명인증, 가입의사 확인, 연령제한 서비스 (VOD) 이용 기관정보 안내를 위한 <br />
            뉴스레터 발송, 정보 확보, 접속빈도 파악, 회원의 서비스 이용에 대한 통계 집계, 이벤트 참여 기회 제공.</p>

            <h3>수집하는 개인정보의 항목</h3>
            <p>회원가입 과정에서 필수항목 (이름, 생년월일, 아이디, 주소, 휴대폰, 이메일) 서비스 이용과정에서 <br />
            자동으로 생성되는 정보 (쿠키, 방문 일시, 서비스 이용 기록).</p>

            <h3>개인정보의 보유 및 이용기간</h3>
            <p>홈페이지 회원 가입 및 관리: 2년. <br />
            다만, 전자상거래에서의 소비자보호에 관한 법률 등 <br />
            타법률에 의해 보존할 필요가 있는 경우에는 일정기간 보존 (최대 5년).</p>

            <h3>동의 거부 권리</h3>
            <p>이용자는 개인정보 수집 및 이용에 대해 동의를 거부할 권리가 있으나, <br />
            동의 거부 시 회원가입 및 회원전용서비스 (VOD) 이용이 제한됩니다.</p>

            <div className="agree-checkbox">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label htmlFor="agree">위 약관에 동의합니다.</label>
            </div> <br />
            {/* 스텝 1에서는 '다음 단계' 버튼만 표시합니다. */}
            <button onClick={handleNextStep}>다음 단계</button>
          </div>
        )}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">실명</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="(필수)"
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="(필수)"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userid">아이디</label>
              <input
                type="text"
                id="userid"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                placeholder="(필수)"
                required
                autoComplete="username"
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
                placeholder="(필수)"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">비밀번호 확인</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="(필수)"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">생년월일</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="생년월일 (필수)"
                required
                autoComplete="bday"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tellecom">통신사</label><br />
              <div className="tellecom-group">
                <div className="tellecom-group-top">
                  <label>
                    <input
                      type="radio"
                      id="tellecom-skt"
                      name="tellecom"
                      value="SKT"
                      checked={formData.tellecom === 'SKT'}
                      onChange={handleChange}
                    />
                    SKT
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="tellecom-kt"
                      name="tellecom"
                      value="KT"
                      checked={formData.tellecom === 'KT'}
                      onChange={handleChange}
                    />
                    KT
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="tellecom-lg"
                      name="tellecom"
                      value="LG U+"
                      checked={formData.tellecom === 'LG U+'}
                      onChange={handleChange}
                    />
                    LG U+
                  </label>
                </div>
                <div className="tellecom-group-bottom">
                  <label>
                    <input
                      type="radio"
                      id="tellecom-sm"
                      name="tellecom"
                      value="SM"
                      checked={formData.tellecom === 'SM'}
                      onChange={handleChange}
                    />
                    SKT 알뜰폰
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="tellecom-km"
                      name="tellecom"
                      value="KM"
                      checked={formData.tellecom === 'KM'}
                      onChange={handleChange}
                    />
                    KT 알뜰폰
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="tellecom-um"
                      name="tellecom"
                      value="UM"
                      checked={formData.tellecom === 'UM'}
                      onChange={handleChange}
                    />
                    LG U+ 알뜰폰
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="mobile">전화번호</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="01012345678 (필수)"
                required
                autoComplete="tel"
                title="전화번호는 - 없이 '01012345678' 형식으로 입력해 주세요."
              />
            </div>
            <div className="form-group">
              <label htmlFor="region">지역</label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="(선택)"
                autoComplete="address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname">별명</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="(필수)"
                required
                autoComplete="nickname"
              />
            </div>
            <div className="form-group">
              <label>선호 장르</label> <br />
              <div className="favorite-group">
                <div className="favorite-group-top">
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Action"
                      checked={formData.favorite.includes('Action')}
                      onChange={handleChange}
                    />
                    액션
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Thriller"
                      checked={formData.favorite.includes('Thriller')}
                      onChange={handleChange}
                    />
                    스릴러
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Science Fiction"
                      checked={formData.favorite.includes('Science Fiction')}
                      onChange={handleChange}
                    />
                    SF
                  </label>
                </div>
                <div className="favorite-group-bottom">
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Comedy"
                      checked={formData.favorite.includes('Comedy')}
                      onChange={handleChange}
                    />
                    코미디
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Romance"
                      checked={formData.favorite.includes('Romance')}
                      onChange={handleChange}
                    />
                    멜로
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Fantasy"
                      checked={formData.favorite.includes('Fantasy')}
                      onChange={handleChange}
                    />
                    판타지
                  </label>
                </div>
                <div className="favorite-group-bottom">
                  <label>
                    <input
                      type="checkbox"
                      name="favorite"
                      value="Animation"
                      checked={formData.favorite.includes('Animation')}
                      onChange={handleChange}
                    />
                    애니메이션
                  </label>
                </div>
              </div>
            </div>
            {/* 스텝 2에서는 '회원가입' 버튼만 표시합니다. */}
            <button type="submit">회원가입</button>
          </form>
        )}
        {currentStep === 3 && 
          <div>
            회원가입이 성공적으로 완료되었습니다. <br /><br />
            <button onClick={handleLoginRedirect}>로그인 페이지로 이동</button>
          </div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </Layout>
  );
}

export default SignupPage;
