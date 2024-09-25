import { axio } from './index.js';

export const createAxiosAuthMiddleware = () => {
  return ({ getState }) =>
    (next) =>
    (action) => {
      const token = localStorage.getItem('accessToken');
      axio.defaults.headers.common.Authorization = token
        ? `Bearer ${token}`
        : null;

      return next(action);
    };
};
