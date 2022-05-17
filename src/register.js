import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import Content from './components/content';
import * as settings from './conf/conf';
import Datalist from './components/datalist';
import Helmet from 'react-helmet';
import './App.css';

function Register(){
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  Axios.defaults.withCredentials = true;
  

  const register = () => {
    Axios.post(settings.config.SERVER_URL + '/register', {
      username: usernameReg,
      password: passwordReg,
      firstName: firstNameReg,
      lastName: lastNameReg
    }).then((response)=> {
      setLoginStatus(response.data.message)
      if (response.data.registered === true){
        window.location.href = ("/")
      }else{
        document.getElementById("loginStatus").style.color = "red";
      }
    });
    
  }
  return(
    <div className='App'>
      <div className='registration'>

        <h1>Registration</h1>
        <input
        type='text' 
        onChange={(e) => {
          setFirstNameReg(e.target.value);
        }}
        placeholder="Vorname"
        /><br/>
        <input
        type='text' 
        onChange={(e) => {
          setLastNameReg(e.target.value);
        }}
        placeholder="Nachname"
        /><br/>
        <input
        type='text' 
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
        placeholder="Username"
        /><br/>
        <input
        type='password' 
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
        placeholder="Passwort"
        /><br/>
        <button onClick={register}>Register</button><br/>
      </div><br/>
      Oder <a style={{color: "#528ffa"}} href="/">anmelden?</a>
      <h1 id="loginStatus">{loginStatus}</h1>
    </div>
  );
}

export default Register;
