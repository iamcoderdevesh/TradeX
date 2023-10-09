import React from 'react'
import Navbar from 'layouts/MainLayout/Navbar';
import Sidebar from 'layouts/MainLayout/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./routes";
import { Home } from 'pages';
const route = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={(<Home />)} />
        {routes.menu.map((route) => (
          <Route key={route} path={route.path} element={(route.component)} />
        ))}
        {routes.submenu.map((route) => (
          <Route key={route} path={route.path} element={(route.component)} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default route
