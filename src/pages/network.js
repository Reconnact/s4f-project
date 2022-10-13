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
import CreatePost from './createPost';
import Header  from '../components/header';
import Content from '../components/content';
import ChangePassword from './changePassword';
import ChangePicture from './changePicture';
import Loading from '../components/loading';
import Follower from './follower';

function SocialNetwork(props) {
  const [data, setData] = useState();
  const [newFollowers, setNewFollowers] = useState();
  const [isLoading, setLoading] = useState(true);
    
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.post(settings.config.SERVER_URL + '/getUser', {id: props.id})
      .then((response) => {
        setData(response.data[0])
    });
    Axios.post(settings.config.SERVER_URL + "/newFollowers", {profileID: props.id})
      .then((response) => {
        setNewFollowers(response.data)
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
        <title>Social IMS</title>
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
                  <a href='account'>
                    <div style={{paddingLeft: "15%", paddingRight: "15%", marginBottom: "5%"}}>
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
                { newFollowers.length > 0 ?
                <div className='newFollower'>
                  {newFollowers.map((follower) => (
                    <div style={{marginBottom: "5%"}}>
                      <span><a className="networkEntry" href={"/profile/" + follower.username} style={{ display: 'flex', textAlign: 'left', alignContent:      "space-evenly"}}>
                      <img className='profilePicture'  
                          style={{width: "10%", borderRadius: "100%", boxShadow: "none", objectFit: "cover"}} 
                          src={"/profile-pictures/profilePicture" + follower.profileID + ".png"} onError={({ currentTarget }) => {
                          currentTarget.onerror = null; 
                          currentTarget.src="/profile-pictures/profilePicture.png";
                      }}/>
                      <div style={{paddingLeft: "2%"}}>
                        <h5 style={{fontWeight: "normal",margin: 0, verticalAlign: "middle"}}><b>{follower.username}</b> Folgt dir jetzt</h5>
                        <h5 style={{fontWeight: "normal",margin: 0, color: "#8E8E8E"}}>{follower.date.split("T")[0] + " " + follower.date.split("T")[1].slice(0, 5)}</h5>
                      </div>
                      </a>
                      </span>
                    </div>
                  ))}
                </div>:
                <div />
                }
              </div>
            </main></body>}/>
        <Route path='/post/:id' element={<Post id={props.id}/>}/>
        <Route path='/post/new' element={<CreatePost id={props.id}/>}/>
        <Route path="/account" element={<Account id={props.id} username={props.username}/>}/>
        <Route path="/profile/:username" element={<Profile username={props.username} id={props.id}/>}/>
        <Route path="/profile/:username/network" element={<Follower id={props.id} username={props.username}/>}/>
        <Route path="/account/network" element={<Follower id={props.id} username={props.username}/>}/>
        <Route path="/account/edit" element={<Edit id={props.id}/>}/>
        <Route path="/account/changePassword" element={<ChangePassword id={props.id}/>}/>
        <Route path="/account/changePicture" element={<ChangePicture id={props.id} username={props.username}/>}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </Router>
  );
}

export default SocialNetwork;
