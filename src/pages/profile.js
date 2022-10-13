import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import {useParams} from 'react-router-dom'
import Axios from "axios";
import * as settings from '../conf/conf';
import Content from '../components/content';
import Header from "../components/header";
import Loading from "../components/loading";
import Error from "./error";
import ProfileData from "../components/profileData"


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
                setData(response.data[0]);
                setLoading(false)
            });
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && data === undefined){
        return <Error />
    }
    
    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{username} | Profil</title>
            </Helmet>
            <Header id={props.id}/>
            <main style={{display: "block"}}>
                <ProfileData data={data} account={false} id={props.id}/>
                <div className='profilePosts' id='profilePosts'>
                    <Content account={true} username={username} user={props.username}/>
                </div>
            </main>
        </body>
    );
}

export default Profile;