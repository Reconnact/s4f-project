import React, {useState, useRef} from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import Axios from "axios";
import * as settings from '../conf/conf';
import Header from "../components/header";
import Swal from 'sweetalert2'

function Post(props){
    const [title, setTitle] = useState('');
    const [titleCounter, setTitleCounter] = useState(255);
    const [text, setText] = useState('');
    const [textCounter, setTextCounter] = useState(1000);


    const post = () =>{
        if (title !== "" & text !== ""){
            if (title.length <= 255 & text.length <= 1000){
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
                    'Es sind maximal 1000 Zeichen für den Text und 255 Zeichen für den Titel zulässig!',
                    "",
                    'error'
                )
            }
        }else{
            Swal.fire(
                'Bitte alle Felder ausfüllen!',
                '',
                'error'
            )
        }
        
    }

    const titleUpdate = (e) => {
        setTitle(e.target.value)
        setTitleCounter(255-e.target.value.length)
    }

    const textUpdate = (e) => {
        setText(e.target.value)
        setTextCounter(1000-e.target.value.length)
    }

    return (
        <body>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Beitrag erstellen</title>
            </Helmet>
            <Header id={props.id}/>
            <main>
                <div className="createPost">
                    <div style={{width: "65%"}}>
                        <h3 style={{marginBottom: "0%"}}>Titel</h3>
                        <input type="text" placeholder="Titel" maxLength={255} style={{width: "50%"}} onChange={(e) => {
                            titleUpdate(e)
                        }}/>
                        <p>Zulässige Zeichen: {titleCounter}</p>
                        <h3 style={{marginBottom: "0%"}}>Text</h3>
                        <textarea style={{resize: "none", width: "100%"}} rows="10" maxLength={1000} onChange={(e) => {
                            textUpdate(e)
                        }}></textarea>
                        <p>Zulässige Zeichen: {textCounter}</p>
                    </div>
                    <div style={{width: "35%", position: "relative"}}>
                        <button id="publishButton" className="publishButton" onClick={post}>Veröffentlichen</button>
                    </div>
                </div>
            </main>
        </body>
    )
}

export default Post;