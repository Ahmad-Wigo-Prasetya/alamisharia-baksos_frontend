import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 1 / 24,
      path: '/',
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1 / 24,
    });
  }
};

export const getCookie = (key) => Cookies.get(key);
