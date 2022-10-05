import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import * as settings from '../conf/conf';
import Header from '../components/header';
import Swal from 'sweetalert2'
import Loading from '../components/loading'

function Edit(props) {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false)
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Axios.post(settings.config.SERVER_URL + '/getUser', {id: props.id})
        .then((response) => {
            setUsername(response.data[0].username)
            setFirstName(response.data[0].firstName)
            setLastName(response.data[0].lastName)
            setBio(response.data[0].bio)
            setData(response.data[0])
            setLoading(false)
        });
    }

    const changePassword = () => {
        window.location.href = "/account/changePassword"
    }

    const changeProfilePicture = () => {
        window.location.href = "/account/changePicture"
    }



    const changeData = () => {
        (async () => {
            await Axios.post(settings.config.SERVER_URL + '/editProfile', {
            oldUsername: data.username,
            username: username,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }).then((response)=> {
            Swal.fire(
                response.data[0],
                response.data[1],
                response.data[2]
            ).then((res)=> {
                if (response.data[2] === "success"){
                    window.location.href=("/")
                }
            })
        });
        })()
    }

    if (isLoading) {
        return <Loading />;
      }

    if (changed){
        const button = document.getElementById("changeData").disabled = false;
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data.username} | Edit account</title>
            </Helmet>
            <Header id={data.profileID}/>
            <main>
            <div className='profile'>
                <div className='editProfile'>
                        <div style={{paddingLeft: '5%', width: '40%'}}>
                            <div className='editProfileData'>
                                <img className='profilePicture' 
                                    style={{paddingBottom: "0"}} src={"/profile-pictures/profilePicture" + data.profileID + ".png"} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; 
                                    currentTarget.src="/profile-pictures/profilePicture.png";
                                }}/><br/>
                                <div className='editPicture'>
                                    <p>{data.username}</p>
                                    <a onClick={changeProfilePicture}>Profilbild ändern</a>
                                </div>
                            </div>
                            <div className='edit'>
                                <label className='editText'>Username:</label>
                                <div><input maxLength={45} type="text" placeholder={data.username}
                                onChange={(e) => {setUsername(e.target.value); setChanged(true)}}
                                defaultValue={data.username}/></div>
                            </div>
                            <div className='edit'>
                                <label className='editText'>Vorname:</label>
                                <div><input type="text" maxLength={100} placeholder={data.firstName}
                                onChange={(e) => {setFirstName(e.target.value); setChanged(true)}}
                                defaultValue={data.firstName}/></div>
                            </div>
                            <div className='edit'>
                                <label className='editText'>Nachname: </label>
                                <div><input type="text" maxLength={100} placeholder={data.lastName}
                                onChange={(e) => {setLastName(e.target.value); setChanged(true)}}
                                defaultValue={data.lastName}/></div>
                            </div>
                            <div className='edit' style={{height: "25%", marginBottom: "5%"}}>
                                <label className='editText' >Profil-Bio: </label>
                                <textarea maxLength={150}
                                onChange={(e) => {setBio(e.target.value); setChanged(true)}}>{data.bio}</textarea>
                            </div>
                            <div style={{justifyContent: "space-between", display: "flex"}}>
                            <button onClick={() =>{window.location.href = "/account"}}>Zurück</button>
                                <button onClick={changeData} disabled id="changeData">Daten ändern</button>
                                <button onClick={changePassword}>Passwort ändern</button>
                            </div>
                        </div>
                </div>
            </div>
            </main>
        </body>
      );
}

export default Edit;