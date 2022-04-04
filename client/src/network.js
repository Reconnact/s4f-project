import React, { useEffect } from 'react';
import Profile from './profile';
import ReactDOM from 'react-dom';
import './network.css';
import Content from './content';

function SocialNetwork(props) {
  function profilePicture() {
    ReactDOM.render (
      <Profile 
      profilePicture={props.profilePicture}
      username={props.username}
      firstName={props.firstName}
      lastName={props.lastName}
      />,
      document.getElementById('root')
    );
  }

  useEffect(() => {
    document.title = "SocialNetwork"
  }, [])




  return (
    <body>
      <header className="App-header" id="App-header">
          <div className='inner-header'>
            <a href='index.js'><h3>Social Network</h3></a>
          </div>
      </header>
      <main>
        <div className='feed' id='feed'>
        </div>
        <div className='personalCard'>
          <a onClick={profilePicture}><div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%"}}>
            <img src={props.profilePicture}/>
            <div style={{fontSize: "150%"}} id="username">{props.username}</div>
            <div>{props.firstName} {props.lastName}</div>
          </div>
          </a></div>
      </main>
    </body>
  );

}

export default SocialNetwork;
