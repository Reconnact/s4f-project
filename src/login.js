import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import * as settings from './conf/conf';
import Helmet from 'react-helmet';
import Swal from 'sweetalert2';
import Loading from './components/loading';

function Login(){
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [isLoading, setLoading] = useState(true);

  Axios.defaults.withCredentials = true;

  useEffect(()=> {
    checkCookies();
  }, []);

  const checkCookies = () => {
    Axios.get(settings.config.SERVER_URL + '/login').then((response) => {
      setLoggedIn(response.data.loggedIn);
      setLoading(false);
    });
  }

  const login = () =>{
    if (username !== undefined){
      Axios.post(settings.config.SERVER_URL + '/login', {username: username, password: password,})
      .then((response)=> {
        if (response.data.status === "error"){
          Swal.fire(
            response.data.message,
            "",
            response.data.status
          )
        }
        network();
      });
    } else {
      Swal.fire(
        "Username darf nicht leer sein",
        "",
        "error"
      )
    }
  } 

  const network = () =>{
    Axios.get(settings.config.SERVER_URL + '/login')
    .then((response) =>{
      ReactDOM.render(
        <SocialNetwork 
        id={response.data.user[0].profileID}
        username={response.data.user[0].username} 
        firstName={response.data.user[0].firstName}
        lastName={response.data.user[0].lastName}
        bio={response.data.user[0].bio}/>,
        document.getElementById('root')
      );
    });
    
    
  };

  if (isLoading) {
    return <Loading />
  }

  if (loggedIn != true){
  return (
    <html id='login'>
          <Helmet>
            <meta charSet="utf-8" />
            <title>SocialNetwork</title>
          </Helmet>
          <body className="App">
            <div style={{display: "flex"}}>
              <div style={{width: "60%", marginTop: "5%"}}>
                <div style={{alignItems: "center", display: "flex", justifyContent: "right", marginTop: "5%"}}>
                  <div>
                    <h1>SocialNetwork</h1>
                    <p style={{width: "fit-content"}}>Willkommen beim SocialNetwork!&#128526;<br />
                       Hier kannst über deine Meinungen,<br/> Erfahrungen und über dein Wissen schreiben!
                    </p>
                  </div>
                  <img src='/logo.ico' width="35%" style={{verticalAlign: "center"}}/>
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
                <button className="button" onClick={login}>Login</button><br/><br/>
                Oder <a style={{color: "#528ffa"}} href="/register">registrieren?</a><br/>
                <a style={{color: "#528ffa"}} href="/reset">Passwort vergessen?</a>
              </div>
            </div>
          </body>
          </html>
  )
} else {
  network();
}
}

export default Login;
