/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { useLocation } from 'react-router-dom';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useGetMeInfoQuery } from './api/auth-api-req';

// ----------------------------------------------------------------------

export default function App() {
  const location = useLocation();
  useScrollToTop();
  useGetMeInfoQuery(
    {
      path: location.pathname,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
