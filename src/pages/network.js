import React from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../network.css';
import Account from './account';
import Profile from './profile';
import Error from './error';
import Edit from './edit';
import Post from './post';
import Header  from '../components/header';

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
        <Header />
        <main>
          <div className='feed' id='feed' >
          </div>
          <div style={{float: "right", width: "30%", marginTop: "2%"}}>
            <div className='personalCard'>
              <a href='account'><div style={{paddingLeft: "15%", paddingRight: "15%", marginBottom: "5%"}}>
                <img src="/profile-pictures/profilePicture.png"/>
                <div style={{fontSize: "150%"}} id="username">{props.username}</div>
                <div>{props.firstName} {props.lastName}</div>
              </div>
              </a>
            </div>
            <button className='addPostButton' onClick={()=> {window.location.href = "post/new"}}>
              Beitrag erstellen
            </button>
         </div>
        </main>
      </body>}/>
        <Route path='/post/new' element={<Post
        id={props.id}/>}/>
        <Route path="/account" element={<Account 
         profilePicture='/profile-pictures/profilePicture.png'
         username={props.username}
         firstName={props.firstName}
         lastName={props.lastName}
         bio={props.bio}/>}/>
         <Route path="/profile/:username" element={<Profile 
         username={props.username}/>}/>
         <Route path="/account/edit" element={<Edit 
         profilePicture='/profile-pictures/profilePicture.png'
         username={props.username}
         firstName={props.firstName}
         lastName={props.lastName}
         bio={props.bio}/>}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </Router>
    
  );

}

export default SocialNetwork;
