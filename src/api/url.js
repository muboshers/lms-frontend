export const AUTH = {
    LOGIN: 'auth/login',
    GET_ME: 'auth/get-me',
};

export const GROUP = {
    GET_LIST: 'group/list',
    CREATE: 'group/create',
    UPDATE: 'group/update',
    DELETE: 'group/delete', // it tekes id
    GET_BY_ID: 'group/get', // it takes ids
};

export const FILE = {
    UPLOAD: 'file/upload',
    SINGLE_UPLOAD: 'file/single-upload',
};

export const TOPIC = {
    CREATE: 'topic/create',
    UPDATE: 'topic/update', // it takes id
    DELETE: 'topic/delete', // it takes id
    GET_SECTIONS_BY_TOPIC_ID: 'topic/get-section/', // it takes id
    ADD_SECTION_TOPIC: 'topic/create-section/', // it takes id
    UPDATE_SECTION_TOPIC: 'topic/update-section/', // it takes id
    DELETE_SECTION_TOPIC: 'topic/delete-section/', // it takes id
    SORT_SECTION_TOPIC: 'topic/sort-section/', // it takes id
};

export const TEACHER = {
    GET_LIST: 'teacher/list',
    CREATE: 'teacher/create',
    DELETE: 'teacher/delete', // it takes id
    UPDATE: 'teacher/update', // it takes id
};

export const PUPILS = {
    GET_LIST: 'pupils/get-list',
    CREATE: 'pupils/create',
    DELETE: 'pupils/delete', // it takes id
    UPDATE: 'pupils/update', // it takes id,
    GET_PUPILS_BY_TOPIC_ID: 'pupils/get-by-topic/', // it takes topic id
};


export const TEACHING_CENTER = {
    UPDATE_PROFILE_INFO: 'teaching-center/profile',
    UPDATE_TG_INFO: 'teaching-center/update-tg',
};
