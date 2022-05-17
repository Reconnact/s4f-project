import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from 'axios'
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from '../components/header';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  logOut() {
    Axios.get(settings.config.SERVER_URL + '/logout');
    setTimeout(() => {window.location.href = ("/");}, 250)

  }

  edit(){
    window.location.href = '/account/edit'
  }
  render() {
  return (
    <body>
      <Helmet>
      <meta charSet="utf-8" />
      <title>{this.props.username} | Account</title>
      </Helmet>
      <Header />
      <main style={{display: "block"}}>
        <div className='profile'>
          <div className='profileNav'>
            <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
              <div style={{display: "flex"}}>
                <img src={this.props.profilePicture}/>
                <div className='profileOptions'>
                  <button onClick={this.edit}>Profil bearbeiten</button><button onClick={this.logOut}>Log out</button>
                </div>
              </div>
              <div style={{display: "flex"}}>
                <div>
                  <div style={{fontSize: "150%"}} id="username">{this.props.username}</div>
                  <div>{this.props.firstName} {this.props.lastName}</div>
                </div>
                <div className='description' style={{marginTop: "0", alignSelf: "center", marginLeft: "5%"}}>{this.props.bio}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='profilePosts' id='profilePosts'>
          <Content account={true} username={this.props.username}/>
        </div>
      </main>
    </body>
  );}
}


export default Profile;
