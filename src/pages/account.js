import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Content from '../components/content';
import Header from '../components/header';
import ProfileData from '../components/profileData';

function Profile(props) {
  return (
    <body>
      <Helmet>
      <meta charSet="utf-8" />
      <title>{props.data.username} | Account</title>
      </Helmet>
      <Header id={props.data.profileID}/>
      <main style={{display: "block"}}>
        <ProfileData data={props.data} account={true}/>
        <div className='profilePosts' id='profilePosts'>
          <Content account={true} username={props.username} user={props.data.username} />
        </div>
      </main>
    </body>
  );
}
export default Profile;
