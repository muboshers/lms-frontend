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
};

export const TEACHER = {
  GET_LIST: 'teacher/list',
};

export const TEACHING_CENTER = {
  UPDATE_PROFILE_INFO: 'teaching-center/profile',
  UPDATE_TG_INFO: 'teaching-center/update-tg',
};
