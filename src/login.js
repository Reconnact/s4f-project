import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import SocialNetwork from './pages/network';
import Content from './components/content';
import * as settings from './conf/conf';
import Datalist from './components/datalist';
import Helmet from 'react-helmet';
import Cookies from 'js-cookie';



function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
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
    });
  }

  const network = () =>{
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
          <Content max={resp.data[0].Max_Id} account={false} username={response.data.user[0].username} user={response.data.user[0].username}/>,
          document.getElementById("feed")
        ); 
      });
      ReactDOM.render(
        <Datalist username={response.data.user[0].username}/>,
        document.getElementById("search-bar")
      );
    });
    
    
  };

  if (isLoading) {
    return <div className="App"></div>;
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
                       Hier kannst ??ber deine Meinungen,<br/> Erfahrungen und ??ber dein Wissen schreiben!
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
                <button onClick={login}>Login</button><br/><br/>
                Oder <a style={{color: "#528ffa"}} href="/register">registrieren?</a>
              </div>
            </div>
            <h1 id='loginStatus'>{loginStatus}</h1>
          </body>
          </html>
  )
} else {
  network();
}
}

export default Login;
