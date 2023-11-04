import { useSelector } from "react-redux";
import { lazy, useMemo, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import { isTokenExpried } from "src/utils/jsonwebtoken";

import DashboardLayout from "src/layouts/dashboard/DashboardLayout";

import { TEACHING_CENTER_DASHBOARD_PATH } from "./path";

export const BlogPage = lazy(() => import("src/pages/group"));
export const TeacherListPage = lazy(() => import("src/pages/teacher-list"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

export default function Router() {
  const teachingCenter = useSelector((state) => state.teachingCenter);

  const ISTOKENEXRIED = useMemo(() => isTokenExpried(teachingCenter?.token), [
    teachingCenter,
  ]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <BlogPage />, index: true },
        {
          path: TEACHING_CENTER_DASHBOARD_PATH.TEACHERS_LIST,
          element: <TeacherListPage />,
        },
      ],
    },

    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return teachingCenter?.isAuthenticated && ISTOKENEXRIED ? (
    routes
  ) : (
    <LoginPage />
  );
}
