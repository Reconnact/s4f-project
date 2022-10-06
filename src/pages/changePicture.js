import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import * as settings from '../conf/conf';
import Header from '../components/header';
import Swal from 'sweetalert2'

function ChangePassword(props){
    const id = props.id;
    const onChange = () => {
        const file = document.getElementById("mypic").files[0];
        if (file) {
            if (file.size < 2000000){
                document.getElementById("image").src = URL.createObjectURL(file);
            } else {
                Swal.fire(
                    "Fehler",
                    "Das Bild darf nicht grösser als 2MB sein!",
                    "error"
                )
            }
        }
    }

    const buttonClick = () => {
        document.getElementById('mypic').click()
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.username} | Change Picture</title>
            </Helmet>
            <Header id={props.id}/>
            <main>
            <iframe id="invisible" name="invisible" style={{display: "none"}}></iframe>
            <div className='editProfile' style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                <h1 >Profilbild ändern</h1> 
                    <form  target='invisible' action={settings.config.SERVER_URL + "/uploadProfilePicture"}
                        enctype="multipart/form-data" method="POST">
                        <div style={{marginTop: "3%", position: "relative", width: "max-content", verticalAlign: "middle", display: "inline-block"}}>
                            <img className='profilePicture' 
                                style={{paddingBottom: "0", width: "100px", height: "100px"}}
                                id='image' src={"/profile-pictures/profilePicture" + props.username + ".png"} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; 
                                currentTarget.src="/profile-pictures/profilePicture.png";
                            }} />
                        <input className='roundEditButton' type="button" value="&#128394;" onClick={(e) =>{buttonClick()}}/><br/>
                        </div><br/>
                        <input style={{display: "none"}} type="file" name="mypic" id="mypic" required accept="image/png, image/gif, image/jpeg" onChange={(e) => {onChange()}}/>
                        <input type="submit" value="Profilbild ändern" style={{width: "auto"}} /> 
                        <input type="button" onClick={(e) => {window.location.href = "/account/edit"}} value="Zurück" />
                    </form>
                    
                </div>
            </main>
        </body>
    )
}

export default ChangePassword;
