export const isProductionMode = process.env.NODE_ENV === 'production';

export const baseURL = isProductionMode
    ? 'https://lms-management.vercel.app/v1/api/'
    : 'http://localhost:3000/v1/api/';

export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const CLEAVE_SUM_CONFIG = {
    numeral: true,
    delimiter: ' ',
    numeralDecimalMark: '.',
    numeralPositiveOnly: true,
};

export const CLEAVE_PHONE_CONFIG = {
    prefix: "+998",
    blocks: [4, 2, 3, 2, 2],
};

export const WEEK_DAYS = [
    {value: 'Dush'},
    {value: 'Sesh'},
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

export const SETTINGS_TABS = {
    GENERAL: 'Asosiy',
    TG_BOT: 'Telegram bot',
};
