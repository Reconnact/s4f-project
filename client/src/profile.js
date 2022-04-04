import React from 'react';
import './network.css';
import Axios from 'axios';
import { useEffect } from 'react/cjs/react.production.min';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  logOut() {
    Axios.get('http://localhost:3001/logout');
    window.location.reload();
  }

  render() {
  return (
    <body>
      <header className="App-header" id="App-header">
          <div className='inner-header'>
            <a href='index.js'><h3>Social Network</h3></a>
          </div>
      </header>
      <div className='profile'>
      <div className='profileNav'>
        <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%"}}>
          <img src={this.props.profilePicture}/>
          <div style={{fontSize: "150%"}} id="username">{this.props.username}</div>
          <div>{this.props.firstName} {this.props.lastName}</div>
        </div>
        <div className='profileOptions'>
          <button>Edit profile</button><button onClick={this.logOut}>Log out</button>
          <div className='description'>TODO:<br/> Hier kommt die Beschreibung hin</div>
        </div>
      </div>
      </div>
    </body>
  );}
}



export default Profile;
