import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./routes";
import { Dashboard, PageNotFound } from 'pages';
import Layout from 'layouts';
import { useSelector } from 'react-redux';
import Prefetch from 'layouts/prefetch';

const PageRoute = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  useEffect(() => {
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={(<PageNotFound />)} />
        <Route element={(<Prefetch />)}>
          {/* ({authStatus
            ? // Protected Routes */}
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

            {/* : // Authentication Routes */}
            <Route>
              {routes.auth.map((route) => (
                <Route key={route} path={route.path} element={(route.component)} />
              ))}
            </Route>
          {/* }); */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoute;
