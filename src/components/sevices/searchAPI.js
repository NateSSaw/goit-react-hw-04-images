const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33324048-b9ba4b7c70cb9631c17379677';

function getImages(searchImage, page = 1) {
  const options = 'image_type=photo&orientation=horizontal&per_page=12';
  return fetch(
    `${BASE_URL}?q=${searchImage}&page=${page}&key=${API_KEY}&${options}`
  ).then(res => {
    if (res.ok) return res.json();
    else return Promise.reject(new Error('No response from server'));
  });
}

const api = {
  getImages,
};

export default api;
