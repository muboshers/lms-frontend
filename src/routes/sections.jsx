import { useSelector } from 'react-redux';
import { lazy, useMemo, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isTokenExpried } from 'src/utils/jsonwebtoken';

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CategoryViewPage = lazy(() => import('src/pages/category-view'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ClientsPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const OrdersPage = lazy(() => import('src/pages/order'));
export const NewProductPage = lazy(() => import('src/pages/new-product'));
export const ColorsPage = lazy(() => import('src/pages/colors'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const user = useSelector((state) => state.user);
  const ISTOKENEXRIED = useMemo(() => isTokenExpried(user?.token), [user]);
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
        { element: <IndexPage />, index: true },
        { path: 'clients', element: <ClientsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'category/:id', element: <CategoryViewPage /> },
        { path: 'color', element: <ColorsPage /> },
        { path: 'new-product', element: <NewProductPage /> },
        { path: 'orders', element: <OrdersPage /> },
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

  return user?.isAuthenticated && ISTOKENEXRIED ? routes : <LoginPage />;
}
