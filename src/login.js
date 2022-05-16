import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import Content from './components/content';
import * as settings from './conf/conf';
import Datalist from './components/datalist';
import Helmet from 'react-helmet';


function Login(){
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    });
    
  }

  const login = () => {
    Axios.post(settings.config.SERVER_URL + '/login', {
      username: username,
      password: password,
    }).then((response)=> {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      }else{
        setLoginStatus(response.data[0].username);
        network();
      }
      console.log(response.data);
    });
  }

    useEffect(()=> {
      Axios.get(settings.config.SERVER_URL + '/login').then((response) =>{
        if (response.data.loggedIn === true){
          setLoginStatus(response.data.user[0].username);
          network();
        }
      });
    }, []);

    const network = () => {
      Axios.get(settings.config.SERVER_URL + '/login').then((response) =>{
        ReactDOM.render(
          <SocialNetwork 
          id={response.data.user[0].profileID}
          username={response.data.user[0].username} 
          firstName={response.data.user[0].firstName}
          lastName={response.data.user[0].lastName}
          bio={response.data.user[0].bio}/>,
          document.getElementById('root')
        );
        Axios.get(settings.config.SERVER_URL + '/contentNum').then((resp) =>{ 
          ReactDOM.render(
            <Content max={resp.data[0].Max_Id} account={false} username={response.data.user[0].username}/>,
            document.getElementById("feed")
          ); 
        });
        ReactDOM.render(
          <Datalist username={response.data.user[0].username}/>,
          document.getElementById("search-bar")
        );
      });
      
      
    };
  return(
    <body className="App">
      <Helmet>
      <meta charSet="utf-8" />
      <title>SocialNetwork</title>
      </Helmet>
      <div className='login'>
        <h1>Login</h1>
        <input
        type='text' 
        placeholder='Username'
        onChange={(e) => {
          setUsername(e.target.value);
        }}/><br/>
        <input
        type='password' 
        placeholder='Password'
        onChange={(e) => {
          setPassword(e.target.value);
        }}/><br/>
        <button onClick={login}>Login</button>
      </div>
      <div className='registration'>
        <h1>Registration</h1>
        <label>First name</label><br/>
        <input
        type='text' 
        onChange={(e) => {
          setFirstNameReg(e.target.value);
        }}
        /><br/>
        <label>Last name</label><br/>
        <input
        type='text' 
        onChange={(e) => {
          setLastNameReg(e.target.value);
        }}
        /><br/>
        <label>Username</label><br/>
        <input
        type='text' 
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
        /><br/>
        <label>Password</label><br/>
        <input
        type='password' 
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
        /><br/>
        <button onClick={register}>Register</button><br/>
      </div>
      <h1>{loginStatus}</h1>
    </body>
  );
}

export default Login;
