export const isProductionMode = process.env.NODE_ENV === 'production';

export const baseURL = 'https://lms-management.vercel.app/v1/api/';

export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const CLEAVE_SUM_CONFIG = {
  numeral: true,
  delimiter: ' ',
  numeralDecimalMark: '.',
  numeralPositiveOnly: true,
};

export const WEEK_DAYS = [
  { value: 'Dush' },
  { value: 'Sesh' },
  {
    value: 'Chor',
  },
  {
    value: 'Pay',
  },
  {
    value: 'Juma',
  },
  {
    value: 'Shan',
  },
  {
    value: 'Yak',
  },
];
