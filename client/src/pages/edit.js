import Axios from 'axios'
import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import {useNavigate} from 'react-router-dom';
import Notification from '../notification';


function Edit(props) {
    let navigate = useNavigate();
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [bio, setBio] = useState(props.bio);
    const notificationRef = useRef(null);

    const changeData = () => {
        Axios.post("http://localhost:3001/editProfile", {
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
            navigate("../")
        }, 3000);
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.username} | Edit account</title>
            </Helmet>
            <header className="App-header" id="App-header">
                <div className='inner-header'>
                    <a href='/'><h3>Social Network</h3></a>
                </div>
            </header>
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
            <Notification ref={notificationRef} message="Daten wurden geändert" type="success"/>
        </body>
      );
}

export default Edit;