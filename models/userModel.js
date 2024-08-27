const mysql = require('mysql');
const moment = require('moment'); // 현재 시간을 포맷하는 데 사용

// MySQL 연결 설정
const db = mysql.createConnection({
  host: '192.168.0.47',  // 데이터베이스 호스트 주소
  user: 'root',          // 데이터베이스 사용자 이름
  password: '1234',      // 데이터베이스 비밀번호
  database: 'mgcinema',  // 데이터베이스 이름
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// 회원가입 처리 함수
const createUser = (userData, callback) => {
  const { username, email, userid, password, birthday, mobile, region, nickname, favorite, tellecom } = userData;
  // favorite 배열을 콤마로 구분된 문자열로 변환
  const favoriteStr = favorite.join(','); 

  // 현재 시간 문자열 (예: "2024-08-27 12:34:56")
  const now = moment().format('YYYY-MM-DD HH:mm:ss');

  // SQL 쿼리
  const query = `
    INSERT INTO customer (uid, passwd, realname, nickname, email, region, favorite, mobile, tellecom, birthday, created, updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // 쿼리 파라미터
  const values = [userid, password, username, nickname, email, region, favoriteStr, mobile, tellecom, birthday, now, now];

  // 쿼리 실행
  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createUser,
};
