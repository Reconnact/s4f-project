import React, {useState, useRef} from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from "axios";
import * as settings from '../conf/conf';
import Header from "../components/header";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Post(props){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');


    const post = () =>{
        if (title !== "" & text !== ""){
            Axios.post(settings.config.SERVER_URL + '/addPost', {
                profileID: props.id,
                title: title,
                text: text
            }).then((response)=> {
                console.log(response);
            })
            Swal.fire(
                'Beitrag wurde veröffentlicht!',
                'Klicke auf OK um auf die Startseite zurückzukehren!',
                'success'
            ).then((response)=> {
                window.location.href=("/")
            })
        }else{
            Swal.fire(
                'Bitte alle Felder ausfüllen!',
                '',
                'error'
            )
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
        </body>
    )
}

export default Post;