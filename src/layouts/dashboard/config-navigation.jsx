import {TEACHING_CENTER_DASHBOARD_PATH} from 'src/routes/path';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}}/>
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
        title: 'Buyurtmalar',
        path: '/orders',
        icon: icon('ic_blog'),
    },
    {
        title: 'Ranglar',
        path: '/color',
        icon: icon('ic_color'),
    },
    {
        title: "Malumotlarni o'zgartirish",
        path: TEACHING_CENTER_DASHBOARD_PATH.SETTINGS,
        icon: icon('ic_profile'),
    },
];

export default navConfig;
