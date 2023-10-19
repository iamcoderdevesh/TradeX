import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./routes";
import { Home } from 'pages';
import Layout from 'layouts/index';

const route = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={(<Home />)} />
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
      </Routes>
    </BrowserRouter>
  )
}

export default route
