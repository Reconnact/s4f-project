import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../network.css'
import * as settings from '../conf/conf';
import Header from '../components/header';
import Swal from 'sweetalert2'

function ChangePassword(props){


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
                    <form target='invisible' action={settings.config.SERVER_URL + "/uploadProfilePicture"}
                        enctype="multipart/form-data" method="POST" onSubmit={(e) => {window.location.href = "/account/edit"}}>
                        <span>Profilbild hochladen:   </span>  
                        <input type="file" name="mypic" required/>
                        <input type="submit" value="submit" style={{width: "auto"}}/> 
                        <input type="button" onClick={(e) => {window.location.href = "/account/edit"}} value="Back" />
                    </form>
                    
                </div>
            </main>
        </body>
    )
}

export default ChangePassword;