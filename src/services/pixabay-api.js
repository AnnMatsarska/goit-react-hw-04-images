import axios from 'axios';

const API_KEY = '38972541-daa665b100c7be83db8809bae';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (serchedQuery, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${serchedQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
