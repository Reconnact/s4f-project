/* eslint-disable */
import React, { useState } from "react";
import emailjs from "@emailjs/browser"
import axios from "axios";
import * as settings from './conf/conf';

function Reset(){
    const [email, setMail] = useState();
    const [status, setStatus] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    var token = null;

    const generateLink = () => {
        token = rand() + rand() + rand() + rand();
    }

    const rand = () => {
        return Math.random().toString(36).substr(2);
    };
      
  
    const sendEmail = async () => {
        generateLink()
        if (validateEmail(email)){
            axios.post(settings.config.SERVER_URL + "/getUserByMail", {email: email}).then((response) =>{
                if (response.data[0]){
                const templateParams = {
                    username: response.data[0].username,
                    email: email,
                    link: token
                };
                emailjs.send('service_0qp3pvb','template_ix51qon', templateParams, 'E4WstLGLwOuXEd64m')
                .then((res) => {
                    axios.post(settings.config.SERVER_URL + "/createLink", {token: token, id: response.data[0].profileID});
                    setEmailSent(true)
                })
                }else {
                    setStatus("Diese mail existiert nicht")
                }
            })
        }else{
            setStatus("Bitte gebe eine korrekte Mail-Adresse an")
        }
	};
     
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true)
        } return (false)
    }

    if (emailSent){
        return(
            <div className="emailSentConfirm">
                <p>Dir wurde eine Email mit einem Link zum zurücksetzen deines Passworts gesendet!</p>
                <button className="button" onClick={(e) => {window.location.href = "/"}}>Zu der Startseite zurückkehren</button>
            </div>
        )
    }

    return (
        <div className='App'>
            <div className="resetPassword">
                <h1>Reset password</h1>
                <input type="email" placeholder='example@email.com' onChange={(e) => {
                  setMail(e.target.value);
                }}/><br/><button className="button" onClick={sendEmail}>Reset password</button><br/><br/>
                Hast du bereits einen Account? <a style={{color: "#528ffa"}} href="/">Anmelden</a><br/>
                Oder <a style={{color: "#528ffa"}} href="/register">registrieren?</a><br/>
            </div>
            <h1 id="status">{status}</h1>
        </div>
    )
}

export default Reset;
