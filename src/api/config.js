/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getCookie, removeCookie } from 'utils/cookies';

const URL = process.env.REACT_APP_MAIN_URL;
// httpsconst API_VERSION = 'v1';
const token = getCookie('_at');

const instance = axios.create({
  baseURL: `${URL}/api`,
  timeout: -1,
});

instance.interceptors.request.use((config) => {
  if (token) {
    config.headers.authorization = token;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      response: { data },
    } = error;
    if (data.message_error === 'Your token is not valid, please login again.') {
      removeCookie('_at');
      return window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default instance;
