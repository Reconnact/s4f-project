import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login';
import Register from './register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Reset from './pwreset';
import ChangePassword from './reset'
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Social IMS</title>
    </Helmet> 
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />}/>
      <Route path="/reset" element={<Reset />}/>
      <Route path="/reset/:token" element={<ChangePassword />}/>
      <Route path="*" element={<Login />}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

