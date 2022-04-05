import React from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../network.css';
import Profile from './profile';
import Error from './error';
import Content from '../content';

function SocialNetwork(props) {


  return (
    <Router>
      <Helmet>
      <meta charSet="utf-8" />
      <title>SocialNetwork</title>
    </Helmet>
      <Routes>
        <Route  path="/" element={
        <body>
        <header className="App-header" id="App-header">
            <div className='inner-header'>
              <a href=''><h3>Social Network</h3></a>
            </div>
        </header>
        <main>
          <div className='feed' id='feed'>
          </div>
          <div className='personalCard'>
            <a href='account'><div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%"}}>
              <img src={props.profilePicture}/>
              <div style={{fontSize: "150%"}} id="username">{props.username}</div>
              <div>{props.firstName} {props.lastName}</div>
            </div>
            </a></div>
        </main>
      </body>}/>
        <Route path="/account" element={<Profile 
         profilePicture={props.profilePicture}
         username={props.username}
         firstName={props.firstName}
         lastName={props.lastName}/>} />
         <Route path="*" element={<Error />}/> t
      </Routes>
      
    </Router>
    
  );

}

export default SocialNetwork;
