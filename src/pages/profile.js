import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import {useParams} from 'react-router-dom'
import Axios from "axios";
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from "../components/header";
import Loading from "../components/loading";

function Profile(props) {
    let { username } = useParams()
    const [data, setData] = useState(); 
    const [isLoading, setLoading] = useState(true);

    if (username === props.username){
        window.location.href=("/account")
    }
    useEffect(() => {
        for (let index = 0; index < 1; index++) {
            Axios.post(settings.config.SERVER_URL + '/getUserByUsername', {username: username}).then((response)=> {
                console.log(response)
                setData(response.data[0]);
                setLoading(false)
            });
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{username} | Profil</title>
            </Helmet>
            <Header id={data.profileID}/>
            <main style={{display: "block"}}>
            <div className='profile'>
                <div className='profileNav'>
                    <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
                        <img src={"/profile-pictures/profilePicture" + data.profileID + ".png"} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; 
                                    currentTarget.src="/profile-pictures/profilePicture.png";
                                }}/>
                        <div style={{display: "flex", width: "100%"}}>
                            <div>
                                <div style={{fontSize: "150%"}} id="username">{username}</div>
                                <div><p style={{margin: "0"}}>{data.firstName}&nbsp;{data.lastName}</p></div>
                            </div>
                            <div className='description' style={{marginTop: "0", alignSelf: "center", marginLeft: "10%", width: "fit-content"}}>{data.bio}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='profilePosts' id='profilePosts'>
                <Content account={true} username={username} user={props.username}/>
            </div>
            </main>
        </body>
    );
}

export default Profile;