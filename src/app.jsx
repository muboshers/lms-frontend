/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import "src/global.css";

import { useScrollToTop } from "src/hooks/use-scroll-to-top";

import Router from "src/routes/sections";
import ThemeProvider from "src/theme";
import { login } from "./store/auth.reducer";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const dispatch = useDispatch();

  const userStorage = localStorage.getItem("user");

  useLayoutEffect(() => {
    const user = JSON.parse(userStorage);
    dispatch(login(user?.data));
    // return () => {};
  }, [userStorage]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
