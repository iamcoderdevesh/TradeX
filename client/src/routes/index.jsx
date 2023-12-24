import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./routes";
import { useSelector } from 'react-redux';
import { NavigateTopLoader } from 'components/common/loader';
import { MainLayout, Layout } from 'layouts';
const Dashboard = lazy(() => import("pages/dashboard"));
const PageNotFound = lazy(() => import("pages/404_page"));

const PageRoute = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  useEffect(() => {
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Suspense fallback={<NavigateTopLoader />}>
        <Routes>
          <Route element={(<MainLayout />)}>
            <Route path="*" element={(<PageNotFound />)} />
            ({authStatus
              ? // Protected Routes
              <Route element={<Layout />}>
                <Route path="/" element={(<Dashboard />)} />
                {routes.menu.map((route) => (
                  <Route key={route} path={route.path} element={(route.component)} />
                ))}
                {routes.submenu.map((route) => (
                  <Route key={route} path={route.path} element={(route.component)} />
                ))}
                {routes.profile.map((route) => (
                  <Route key={route} path={route.path} element={(route.component)} />
                ))}
                {routes.tabs.map((route) => (
                  <Route key={route} path={route.path} element={(route.component)} />
                ))}
              </Route>

              : // Authentication Routes 
              <Route>
                {routes.auth.map((route) => (
                  <Route key={route} path={route.path} element={(route.component)} />
                ))}
              </Route>
            });
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default PageRoute;
