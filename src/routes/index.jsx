import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import { Dashboard, AddTrade, ImportTrade, Journal } from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const route = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={(<Dashboard />)} />
        <Route path="/Add Trades" element={(<AddTrade />)} />
        <Route path="/Import Trades" element={(<ImportTrade />)} />
        <Route path="/Journal" element={(<Journal />)} />
      </Routes>
    </BrowserRouter>
  )
}

export default route
