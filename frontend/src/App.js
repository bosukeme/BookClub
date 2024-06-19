import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"; 

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import ReadSummary from './pages/ReadSummary';
import NavBar from './components/NavBAr';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}


function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }/>
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/books/book/:id" element={<ReadSummary />} />
        <Route path="*" element={<NotFound />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
