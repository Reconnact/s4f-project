import Axios from 'axios'
import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import Notification from '../components/notification';
import * as settings from '../conf/conf';
import Header from '../components/header';

function Edit(props) {
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [bio, setBio] = useState(props.bio);
    const notificationRef = useRef(null);

    const changeData = () => {
        Axios.post(settings.config.SERVER_URL + '/editProfile', {
            oldUsername: props.username,
            username: username,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }).then((response)=> {
            console.log(response);
        });
        notificationRef.current.show();
        setTimeout(() => {
            window.location.href=("/")
        }, 1000);
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.username} | Edit account</title>
            </Helmet>
            <Header />
            <main>
            <div className='profile'>
                <div className='editProfile'>
                        <div style={{paddingLeft: '5%', width: '30%'}}>
                            <div className='editProfileData'>
                                <img src={props.profilePicture}/><br/>
                                <div className='editPicture'>
                                    <p>{props.username}</p>
                                    <a>Profilbild ändern</a>
                                </div>
                            </div>
                            <div className='edit'>
                                <label className='editText'>Username:</label>
                                <div><input type="text" placeholder={props.username}
                                onChange={(e) => {setUsername(e.target.value)}}
                                defaultValue={props.username}/></div>
                            </div>
                            <div className='edit'>
                                <div className='editText'>Vorname:</div>
                                <div><input type="text" placeholder={props.firstName}
                                onChange={(e) => {setFirstName(e.target.value)}}
                                defaultValue={props.firstName}/></div>
                            </div>
                            <div className='edit'>
                                <div className='editText'>Nachname: </div>
                                <div><input type="text" placeholder={props.lastName}
                                onChange={(e) => {setLastName(e.target.value)}}
                                defaultValue={props.lastName}/></div>
                            </div>
                            <div className='edit'>
                                <div className='editText'>Profil-Bio: </div>
                                <textarea
                                onChange={(e) => {setBio(e.target.value)}}>{props.bio}</textarea>
                            </div>
                            <button onClick={changeData}>Daten ändern</button>
                        </div>
                </div>
            </div>
            </main>
            <Notification ref={notificationRef} message="Daten wurden geändert" type="success"/>
        </body>
      );
}

export default Edit;