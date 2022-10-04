import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import Content from './components/content';
import * as settings from './conf/conf';
import Datalist from './components/datalist';
import Helmet from 'react-helmet';
import Swal from 'sweetalert2';

function Register(){
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  Axios.defaults.withCredentials = true;
  

  const register = () => {

    if (passwordConfirm === passwordReg) {
      if (validateEmail(emailReg)){
          Axios.post(settings.config.SERVER_URL + '/register', {
            username: usernameReg,
            password: passwordReg,
            firstName: firstNameReg,
            lastName: lastNameReg,
            email: emailReg
          }).then((response)=> {
            Swal.fire(
              response.data.message,
              "",
              response.data.status
            )
            if (response.data.registered === true){
              window.location.href = ("/")
            }
          });
      } else {
        Swal.fire(
          "Bitte gebe eine korrekte Mail-Adresse an",
          "",
          "error"
        )
      }
    } else {
      Swal.fire(
        "Die Passwörter stimmen nicht überein",
        "",
        "error"
      )
    }
  }

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    } return (false)
  }

  return(   
    <div className='App'>
      <div className='registration'>
        <h1>Registration</h1>
        <input type='text' onChange={(e) => {setFirstNameReg(e.target.value);}} placeholder="Vorname"/><br/>
        <input type='text' onChange={(e) => {setLastNameReg(e.target.value);}} placeholder="Nachname"/><br/>
        <input type="email" onChange={(e) => {setEmailReg(e.target.value);}} placeholder='example@email.com'/><br/>
        <input type='text' onChange={(e) => {setUsernameReg(e.target.value);}} placeholder="Username"
        /><br/>
        <input
        type='password' 
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
        placeholder="Passwort"
        /><br/>
        <input
        type='password' 
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        placeholder="Passwort erneut eingeben"
        /><br/>
        <button className="button" onClick={register}>Register</button><br/>
      </div><br/>
      Hast du bereits einen Account? <a style={{color: "#528ffa"}} href="/">Anmelden</a><br/>
    </div>
  );
}

export default Register;
