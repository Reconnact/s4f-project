import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import Content from './components/content';
import * as settings from './conf/conf';
import Datalist from './components/datalist';
import Helmet from 'react-helmet';
import Register from './register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;
  
  

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
        } else {
          document.getElementById("loginStatus").style.color = "red";
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
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SocialNetwork</title>
      </Helmet>
      <Routes>
      <Route path="/" element={
      <body className="App">
        <div style={{display: "flex"}}>
          <div style={{width: "70%", marginTop: "5%"}}>
            <div style={{alignItems: "center", display: "flex", justifyContent: "right"}}>
              <div>
                <h1>SocialNetwork</h1>
                <p style={{width: "fit-content"}}>Willkommen beim SocialNetwork!&#128526;<br />
                   Hier kannst über deine Meinungen,<br/> Erfahrungen und über dein Wissen schreiben!
                </p>
              </div>
              <img src='/logo.ico' width="30%" style={{verticalAlign: "center"}}/>
            </div>
          </div>
          <div className='login'>
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
            <button onClick={login}>Login</button><br/><br/>
            Oder <a style={{color: "#528ffa"}} href="/register">registrieren?</a>
          </div>
        </div>
        <h1 id='loginStatus'>{loginStatus}</h1>
      </body>} />
      <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default Login;
