import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import {useParams} from 'react-router-dom'
import '../network.css'
import Axios from 'axios'
import * as settings from '../conf/conf';
import Header from '../components/header';
import Loading from '../components/loading';

function Follower(props) {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    let { username } = useParams()

    if (username == props.username){
        window.location.href = "/account/network"
    } else if (username === undefined){
        username = props.username
    }

    useEffect(() => {
        Axios.post(settings.config.SERVER_URL + '/getUserbyUsername', {username: username})
        .then((response) => {   
            setData(response.data[0])
            Axios.post(settings.config.SERVER_URL + "/getFollowers", {profileID: response.data[0].profileID}).then((response) => {
                setFollowers(response.data)
            })
            Axios.post(settings.config.SERVER_URL + "/getFollowing", {profileID: response.data[0].profileID}).then((res) => {
                console.log(res.data)
                setFollowing(res.data)
            })
            setLoading(false)
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data.username} | Follower</title>
            </Helmet>
            <Header id={props.id}/>
            <main style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "40%"}}><h4>Follower:</h4>
                    {followers.map((follower) => (
                        <div style={{marginBottom: "2%"}}>
                            <span><a className="networkEntry" href={"/profile/" + follower.username} style={{ display: 'flex', textAlign: 'left', alignContent:      "space-evenly"}}>
                            <img className='profilePicture'  
                                style={{width: "10%", borderRadius: "100%", boxShadow: "none", objectFit: "cover"}} 
                                src={"/profile-pictures/profilePicture" + follower.profileID + ".png"} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; 
                                currentTarget.src="/profile-pictures/profilePicture.png";
                            }}/>
                            <div style={{paddingLeft: "2%"}}><h5 style={{margin: 0, verticalAlign: "middle", display: "inline"}}>{follower.username}</h5><h5 style={{margin: 0, color: "#8E8E8E"}}>{follower.firstName} {follower.lastName}</h5></div>
                            </a>
                            </span>
                        </div>
                    ))}
                {followers.length == 0 ? <div>Keine follower</div> : <div/> }
                </div>
                <div style={{width: "40%"}}><h4>Gefolgt:</h4>
                    {following.map((following) => (
                        <div style={{marginBottom: "2%"}}>
                            <span >
                                <a className="networkEntry" href={"/profile/" + following.username} style={{ display: 'flex', textAlign: 'left', alignContent:"space-evenly"}}>
                                    <img className='profilePicture'  
                                        style={{width: "10%", borderRadius: "100%", boxShadow: "none", objectFit: "cover"}} 
                                        src={"/profile-pictures/profilePicture" + following.profileID + ".png"} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; 
                                        currentTarget.src="/profile-pictures/profilePicture.png";
                                    }}/>
                                    <div style={{paddingLeft: "2%"}}><h5 style={{margin: 0, verticalAlign: "middle", display: "inline"}}>{following.username}</h5><h5 style={{margin: 0, color: "#8E8E8E"}}>{following.firstName} {following.lastName}</h5></div>
                                </a>
                            </span>
                        </div>
                    ))}
                    {following.length == 0 ? <div>Niemandem gefolgt</div> : <div/> }
                </div>
            </main>
        </body>
    );
}
export default Follower;
