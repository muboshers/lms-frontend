import { useSelector } from 'react-redux';
import { lazy, useMemo, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isTokenExpried } from 'src/utils/jsonwebtoken';

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

import { TEACHING_CENTER_DASHBOARD_PATH } from './path';

export const GroupListPage = lazy(() => import('src/pages/director/group'));
export const GroupCreatePage = lazy(() => import('src/pages/director/group-create'));
export const GroupEditPage = lazy(() => import('src/pages/director/group-edit'));
export const TeacherListPage = lazy(() => import('src/pages/director/teacher-list'));
export const PupilsPage = lazy(() => import('src/pages/director/pupils'));
export const TopicViewPage = lazy(() => import('src/pages/director/topic-view'));
export const TopicSectionViewPage = lazy(() => import('src/pages/director/topic-sections'));
export const TeacherDeggreesPage = lazy(() => import('src/pages/director/group-create'));
export const GroupViewPage = lazy(() => import('src/pages/director/group-view'));
export const SettingsPage = lazy(() => import('src/pages/director/settings-page'));
export const Chat = lazy(() => import('src/pages/director/chat'));
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
          path: TEACHING_CENTER_DASHBOARD_PATH.PUPILS,
          element: <PupilsPage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.TEACHER_DEGREES}/:id`,
          element: <TeacherDeggreesPage />,
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
          path: TEACHING_CENTER_DASHBOARD_PATH.CHAT,
          element: <Chat />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.GROUP_EDIT}/:id`,
          element: <GroupEditPage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.GROUP_VIEW}/:id`,
          element: <GroupViewPage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.TOPIC_VIEW}/:id`,
          element: <TopicViewPage />,
        },
        {
          path: `${TEACHING_CENTER_DASHBOARD_PATH.TOPIC_SECTION_VIEW}/:id`,
          element: <TopicSectionViewPage />,
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
