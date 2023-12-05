import { useSelector } from 'react-redux';
import { lazy, useMemo, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isTokenExpried } from 'src/utils/jsonwebtoken';

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

import { TEACHING_CENTER_DASHBOARD_PATH } from './path';

export const GroupListPage = lazy(() => import('src/pages/group'));
export const GroupCreatePage = lazy(() => import('src/pages/group-create'));
export const GroupEditPage = lazy(() => import('src/pages/group-edit'));
export const TeacherListPage = lazy(() => import('src/pages/teacher-list'));
export const GroupViewPage = lazy(() => import('src/pages/group-view'));
export const SettingsPage = lazy(() => import('src/pages/settings-page'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const teachingCenter = useSelector((state) => state.teachingCenter);

  const ISTOKENEXRIED = useMemo(() => isTokenExpried(teachingCenter?.token), [teachingCenter]);

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
        { element: <GroupListPage />, index: true },
        {
          path: TEACHING_CENTER_DASHBOARD_PATH.TEACHERS_LIST,
          element: <TeacherListPage />,
        },
        {
          path: TEACHING_CENTER_DASHBOARD_PATH.SETTINGS,
          element: <SettingsPage />,
        },
        {
          path: TEACHING_CENTER_DASHBOARD_PATH.GROUP_CREATE,
          element: <GroupCreatePage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.GROUP_EDIT}/:id`,
          element: <GroupEditPage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.GROUP_VIEW}/:id`,
          element: <GroupViewPage />,
        },
      ],
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return teachingCenter?.isAuthenticated && ISTOKENEXRIED ? routes : <LoginPage />;
}
