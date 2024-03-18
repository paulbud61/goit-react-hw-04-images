import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '40924862-56f4c70484d80a98ef4c30bbb';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  try {
    const response = await axios.get('/', {
      params: {
        q: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Error getting images:', error);
    throw error;
  }
};
