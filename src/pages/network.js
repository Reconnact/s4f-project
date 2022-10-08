import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import * as settings from '../conf/conf';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../network.css';
import Account from './account';
import Profile from './profile';
import Error from './error';
import Edit from './edit';
import Post from './post';
import Header  from '../components/header';
import Content from '../components/content';
import ChangePassword from './changePassword';
import ChangePicture from './changePicture';
import Loading from '../components/loading';

function SocialNetwork(props) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
    
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.post(settings.config.SERVER_URL + '/getUser', {id: props.id})
      .then((response) => {
        setData(response.data[0])
        setLoading(false)
    });
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SocialNetwork</title>
      </Helmet>
      <Routes>
        <Route  path="/" element={
          <body>
            <Header id={data.profileID}/>
            <main>
              <div className='feed' id='feed' >
                < Content max={50} account={false} username={data.username} user={data.username}/>
              </div>
              <div style={{float: "right", width: "30%", marginTop: "2%"}}>
                <div className='personalCard'>
                  <a href='account'><div style={{paddingLeft: "15%", paddingRight: "15%", marginBottom: "5%"}}>
                <div className='avatar'>
                  <img className='profilePicture' 
                    src={"/profile-pictures/profilePicture" + props.id + ".png"} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/profile-pictures/profilePicture.png";
                  }}/>
                  
                  <div style={{fontSize: "150%"}} id="name">{data.firstName} {data.lastName}</div>
                  <div  id="username">@{data.username}</div>
                </div>
                </div>
                </a>
                </div>
                <button className='addPostButton' onClick={()=> {window.location.href = "post/new"}}>
                  Beitrag erstellen
                </button>
              </div>
            </main></body>}/>
        <Route path='/post/new' element={<Post id={props.id}/>}/>
        <Route path="/account" element={<Account id={props.id} username={props.username}/>}/>
        <Route path="/profile/:username" element={<Profile username={props.username} id={props.id}/>}/>
        <Route path="/account/edit" element={<Edit id={props.id}/>}/>
        <Route path="/account/changePassword" element={<ChangePassword id={props.id}/>}/>
        <Route path="/account/changePicture" element={<ChangePicture id={props.id} username={props.username}/>}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </Router>
  );
}

export default SocialNetwork;
