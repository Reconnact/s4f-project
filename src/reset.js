import React, {useState, useEffect} from 'react'
import axios from "axios";
import {useParams} from 'react-router-dom'
import * as settings from './conf/conf';
import Error from './pages/error';
import Swal from 'sweetalert2'

function Reset(){
    let { token } = useParams()
    const [validToken, setValidToken] = useState(true)
    const [id, setId] = useState()
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        axios.post(settings.config.SERVER_URL + "/checkResetToken", {token: token}).then((response) =>{
            if (!response.data[0]){
               setValidToken(false)
            } else {
                setId(response.data[0].profileID)
            }
           
        });
    }, []);

    const changePassword = () =>{
        if (newPassword != "") {
            if (newPassword === passwordConfirm){
                document.getElementById("status").innerHTML = "Passwort wird geändert..."
                axios.post(settings.config.SERVER_URL + "/changePassword", {id: id, password: newPassword}).then((response) =>{
                    axios.post(settings.config.SERVER_URL + "/deleteToken", {token: token}).then(() =>{
                        Swal.fire(
                            "Passwort geändert!",
                            "Drücke um auf die Startseite weitergeleitet zu werden...",
                            "success"
                        ).then((res) =>{
                            window.location.href = "/"
                        })
                    });
                });
            } else {
                document.getElementById("status").innerHTML = "Die Passwörter stimmen nicht überein!"
            }
        } else {
            document.getElementById("status").innerHTML = "Das Passwort darf nicht leer sein!"
        }

    }
    
    if(validToken === false){
        return(
            <Error />
        )
    }

    return(
        <div className='App'>
        <div className="resetPassword">
            <h1>Neues Passwort eingeben</h1>
            <input
        type='password' 
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        placeholder="Passwort"
        /><br/>
        <input
        type='password' 
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        placeholder="Passwort erneut eingeben"
        /><br/>
            <button onClick={changePassword}>Bestätigen</button><br/>
        </div>
        <h1 id="status"></h1>
    </div>
    )
}

export default Reset;