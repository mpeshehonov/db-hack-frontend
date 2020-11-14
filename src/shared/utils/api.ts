import { BACKEND_URL } from './config';

export const request = (url: string, options?: RequestInit) => {
  return fetch(`${BACKEND_URL}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    ...options,
  }).then((r) => r.json());
};

export const post = () => {};
