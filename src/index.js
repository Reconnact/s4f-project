import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Register from './register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Reset from './pwreset';
import ChangePassword from './reset'
global.__basedir = __dirname;
ReactDOM.render(
  <Router>
    <Helmet>
      <meta charSet="utf-8" />
      <title>SocialNetwork</title>
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
