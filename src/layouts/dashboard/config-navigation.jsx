import { TEACHING_CENTER_DASHBOARD_PATH } from "src/routes/path";

import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Guruhlar",
    path: "/",
    icon: icon("ic_users_group"),
  },
  {
    title: "O'qituvchilar",
    path: TEACHING_CENTER_DASHBOARD_PATH.TEACHERS_LIST,
    icon: icon("ic_user"),
  },
  {
    title: "Mahsulotlar",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "Buyurtmalar",
    path: "/orders",
    icon: icon("ic_blog"),
  },
  {
    title: "Ranglar",
    path: "/color",
    icon: icon("ic_color"),
  },
];

export default navConfig;
