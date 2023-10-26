export const AUTH = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  GET_ME: 'auth/me-info',
};

export const CATEGORY = {
  LIST: 'category',
  CREATE: 'category',
  UPDATE: 'category',
  DELETE: 'category',
};

export const PRODUCT = {
  LIST: 'product',
  CREATE: 'product',
  UPDATE: 'product',
  DELETE: 'product',
};

export const COLORS = {
  LIST: 'color',
  CREATE: 'color',
  UPDATE: 'color',
  DELETE: 'color',
};

export const CLIENT = {
  LIST: 'client',
};

export const NOTIFICATION = {
  LIST: 'notification',
  UPDATE_TO_READ: 'notification',
};

export const ORDER = {
  LIST: 'order',
  RECIEVE: 'order/recieve/', // IT TAKES ID
  STATUS: 'order/status/', // IT TAKES ID
  REPORT_EXCEL: 'order/report/excel',
};
