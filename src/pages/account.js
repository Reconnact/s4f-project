import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from 'axios'
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from '../components/header';
import Loading from '../components/loading';
import ProfileData from '../components/profileData';

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
        <ProfileData data={data} account={true}/>
        <div className='profilePosts' id='profilePosts'>
          <Content account={true} username={props.username} user={data.username} />
        </div>
      </main>
    </body>
  );
}
export default Profile;
