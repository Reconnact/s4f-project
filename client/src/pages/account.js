import React from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from 'axios'


class Profile extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  logOut() {
    Axios.get('http://localhost:3001/logout');
    //window.location.reload();
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
      <header className="App-header" id="App-header">
          <div className='inner-header'>
            <a href='/'><h3>Social Network</h3></a>
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
          <button onClick={this.edit}>Edit profile</button><button onClick={this.logOut}>Log out</button>
          <div className='description'>{this.props.bio}</div>
        </div>
      </div>
      </div>
    </body>
  );}
}



export default Profile;
