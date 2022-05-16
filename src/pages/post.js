import React, {useState, useRef} from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import Notification from "../components/notification";
import Axios from "axios";
import * as settings from '../conf/conf';
import Header from "../components/header";

function Post(props){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const failNotificationRef = useRef(null);
    const successNotificationRef = useRef(null);


    const post = () =>{
        if (title !== "" & text !== ""){
            Axios.post(settings.config.SERVER_URL + '/addPost', {
                profileID: props.id,
                title: title,
                text: text
            }).then((response)=> {
                console.log(response);
            })
            successNotificationRef.current.show();
            setTimeout(() => {
                window.location.href=("/")
            }, 1000);
        }else{
            failNotificationRef.current.show();
        }
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Beitrag erstellen</title>
            </Helmet>
            <Header />
            <main>
                <div className="createPost">
                    <div style={{width: "65%"}}>
                        <h3 style={{marginBottom: "0%"}}>Titel</h3>
                        <input type="text" placeholder="Titel" maxLength={255} style={{width: "50%"}} onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                        <h3 style={{marginBottom: "0%"}}>Text</h3>
                        <textarea style={{resize: "none", width: "100%"}} rows="10" maxLength={16777215} onChange={(e) => {
                            setText(e.target.value)
                        }}></textarea>
                    </div>
                    <div style={{width: "35%", position: "relative"}}>
                        <button className="publishButton" onClick={post}>Veröffentlichen</button>
                    </div>
                </div>
            </main>
            <Notification ref={failNotificationRef} message="Bitte fülle alle Felder aus" type="fail"/>
            <Notification ref={successNotificationRef} message="Beitrag wurde veröffentlicht" type="success"/>

        </body>
    )
}

export default Post;