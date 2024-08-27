// src/api/api.jsx

const BASE_URL = 'https://api.example.com';

/**
 * 영화 목록을 가져오는 함수
 */
export async function fetchMovies() {
  const response = await fetch(`${BASE_URL}/movies`);
  const data = await response.json();
  return data;
}

/**
 * 개별 영화의 상세 정보를 가져오는 함수
 * @param {string} id - 영화 ID
 */
export async function fetchMovieDetail(id) {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  const data = await response.json();
  return data;
}
