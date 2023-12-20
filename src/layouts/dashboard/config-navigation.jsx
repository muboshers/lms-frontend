import { TEACHING_CENTER_DASHBOARD_PATH } from 'src/routes/path';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Guruhlar',
    path: '/',
    icon: icon('ic_users_group'),
  },
  {
    title: "O'qituvchilar",
    path: TEACHING_CENTER_DASHBOARD_PATH.TEACHERS_LIST,
    icon: icon('ic_user'),
  },
  {
    title: "O'quvchilar",
    path: TEACHING_CENTER_DASHBOARD_PATH.PUPILS,
    icon: icon('ic_users_group'),
  },
  {
    title: "Malumotlarni o'zgartirish",
    path: TEACHING_CENTER_DASHBOARD_PATH.SETTINGS,
    icon: icon('ic_profile'),
  },
  {
    title: 'Chat',
    path: TEACHING_CENTER_DASHBOARD_PATH.CHAT,
    icon: icon('ic_chat'),
  },
];

export default navConfig;
