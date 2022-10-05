import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from 'axios'
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from '../components/header';
import Loading from '../components/loading';

function Profile(props) {
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
  const logOut = () => {
    Axios.get(settings.config.SERVER_URL + '/logout');
    setTimeout(() => {window.location.href = ("/");}, 250)
  }

  const edit = () =>{
    window.location.href = '/account/edit'
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <body>
      <Helmet>
      <meta charSet="utf-8" />
      <title>{data.username} | Account</title>
      </Helmet>
      <Header id={data.profileID}/>
      <main style={{display: "block"}}>
        <div className='profile'>
          <div className='profileNav'>
            <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
              <div style={{display: "flex"}}>
                <div className="avatar">
                  <img className='profilePicture' 
                    src={"/profile-pictures/profilePicture" + data.profileID + ".png"} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/profile-pictures/profilePicture.png";
                  }}/>
                </div>
                <div className='profileOptions'>
                  <button className='button' onClick={edit}>Profil bearbeiten</button><button className='button' onClick={logOut}>Log out</button>
                </div>
              </div>
              <div style={{display: "flex"}}>
                <div>
                  <div style={{fontSize: "150%", width: "max-content"}}>{data.firstName} {data.lastName}</div>
                  <div id="username">@{data.username}</div>
                </div>
                <div className='description' style={{marginTop: "0", alignSelf: "center", marginLeft: "5%"}}>{data.bio}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='profilePosts' id='profilePosts'>
          <Content account={true} username={data.username} user={data.username}/>
        </div>
      </main>
    </body>
  );
}
export default Profile;
