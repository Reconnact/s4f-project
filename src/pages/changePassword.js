import axios from "axios";
import React, { useState } from "react";
import * as settings from '../conf/conf';
import Swal from "sweetalert2";

function ChangePassword(props) {
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const goBack = () => {
        window.location.href = "/account/edit"
    }

    const changePassword = () =>{
        if (newPassword != "") {
            if (newPassword === passwordConfirm){
                axios.post(settings.config.SERVER_URL + "/changePassword", {id: props.id, password: newPassword}).then((response) =>{
                        Swal.fire(
                            "Passwort geändert!",
                            "Drücke um auf die Startseite weitergeleitet zu werden...",
                            "success"
                        ).then((res) =>{
                            window.location.href = "/"
                        })
                });
            } else {
                Swal.fire(
                    "Fehler!",
                    "Die Passwörter stimmen nicht überein!",
                    "error"
                )
            }
        } else {
            Swal.fire(
                "Fehler!",
                "Das Passwort darf nicht leer sein!",
                "error"
            )
        }

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
            <button onClick={goBack}>Abbrechen</button>&ensp;&ensp;&ensp;
            <button onClick={changePassword}>Bestätigen</button><br/>
        </div>
    </div>
    )
}

export default ChangePassword;
