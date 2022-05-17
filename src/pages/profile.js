import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import {useParams} from 'react-router-dom'
import Axios from "axios";
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from "../components/header";

function Profile(props) {
    let { username } = useParams()
    const [data, setData] = useState([]); 
    if (username === props.username){
        window.location.href=("/")
    }
    useEffect(() => {
        for (let index = 0; index < 1; index++) {
            Axios.post(settings.config.SERVER_URL + '/getUser', {username: username}).then((response)=> {
                setData(response.data[0]);
            });
        }
    }, []);
    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{username} | Profil</title>
            </Helmet>
            <Header />
            <main style={{display: "block"}}>
            <div className='profile'>
                <div className='profileNav'>
                    <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%"}}>
                        <img src='/profile-pictures/profilePicture.png'/>
                        <div style={{display: "flex"}}>
                            <div>
                            <div style={{fontSize: "150%"}} id="username">{username}</div>
                            <div>{data.firstName} {data.lastName}</div>
                            </div>
                            <div className='description' style={{marginTop: "0", alignSelf: "center", marginLeft: "5%"}}>{data.bio}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='profilePosts' id='profilePosts'>
                <Content account={true} username={username}/>
            </div>
            </main>
        </body>
    );
}

export default Profile;