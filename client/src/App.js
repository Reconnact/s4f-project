import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './network';
import Content from './content';
import Login from './login';
import Network from './network';

function App() {
  return (
    <div>
      <Login/>
    </div>
  );
}


export default App;