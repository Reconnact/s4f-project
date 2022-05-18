import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Register from './register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

ReactDOM.render(
  <Router>
    <Helmet>
      <meta charSet="utf-8" />
      <title>SocialNetwork</title>
    </Helmet>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />}/>
      <Route path="*" element={<Login />}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);
