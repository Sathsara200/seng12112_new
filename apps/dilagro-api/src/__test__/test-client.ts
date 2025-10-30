import axios, { AxiosInstance } from 'axios';

export const createTestClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    validateStatus: () => true, // Always return the response regardless of status code
  });

  return client;
};
