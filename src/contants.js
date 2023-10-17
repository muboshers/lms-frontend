const isProductionMode = process.env.NODE_ENV === 'production';

export const baseURL = isProductionMode
  ? 'https://backend-furniture.vercel.app/v1/api/'
  : 'http://localhost:5000/v1/api/';
