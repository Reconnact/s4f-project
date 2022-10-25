import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import Axios from "axios";
import * as settings from '../conf/conf';
import Loading from "../components/loading";
import Error from "../pages/error";
import Header from "../components/header";
import { Helmet } from 'react-helmet'
import { copyFile } from "fs";
import Swal from "sweetalert2";

function Post(props){
    let { id } = useParams()
    const [data, setData] = useState(); 
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [comment, setComment] = useState("");

    const postComment = () => {
        if (comment === ""){
            Swal.fire(
                'Bitte alle Felder ausfüllen!',
                '',
                'error'
            )
        } else if (comment.length > 1000){
            Swal.fire(
                'Es sind maximal 1000 Zeichen für den Kommentar zulässig!',
                "",
                'error'
            )
        } else {
            Axios.post(settings.config.SERVER_URL + "/postComment", {postID: id, profileID: props.id, comment: comment}).then((response) => {
                Swal.fire(
                    'Kommentar wurde veröffentlicht!',
                    'Klicke auf OK um fortzufahren',
                    'success'
                ).then((response)=> {
                    window.location.reload()
                })
            })
        }
    }

    const deleteComment = (id) => {
        Swal.fire({
            title: 'Kommentar wirklich löschen?',
            text: "Wenn der Kommentar gelöscht ist kannst du ihn nicht wiederherstellen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Löschen'
          }).then((result) => {
            if (result.isConfirmed) {
              Axios.post(settings.config.SERVER_URL + '/deleteComment', {id: id}) 
              Swal.fire(
                'Gelöscht!',
                'Dein Kommentar wurde gelöscht.',
                'info'
              ).then((result) => {
                window.location.reload()
              })
            }
          })
    }

    useEffect(() => {

        Axios.post(settings.config.SERVER_URL + "/getPost", {postID: id}).then((result) => {
            var postDate = result.data[0].date.split("T");
            if (result.data[0] !== undefined){
                Axios.post(settings.config.SERVER_URL + "/getComments", {postID: id}).then((res) => {
                    var post = {post: result.data[0], comments: res.data, postDate: postDate[0] + " " + postDate[1].slice(0, 5)}
                    setData(post)
                    setLoading(false) 
                })
            } else {
                setError(true)
                setLoading(false)
            }
        });
    }, []);


    if (error){
        return(
            <Error />
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (!isLoading && data !== undefined){
    return(
        <body>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Post | Social IMS</title>
        </Helmet>
        <Header id={props.id}/>
        <main style={{display: "block"}}>
            <div style={{display: "flex"}}>
                <div className="post">
                    <div className="card" style={{display: "flex"}}>
                        <div className="card-body" style={{width: "100%"}}>
                            <h4>{data.post.title}</h4>
                            <p>{data.post.text}</p>
                            <a className="userLink" href={"/profile/" + data.post.username}>
                                <div className="user" style={{alignItems: "center"}}>
                                    <img className='profilePicture' 
                                        alt="user" id="image" src={"/profile-pictures/profilePicture" + data.post.profileID + ".png"} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; 
                                        currentTarget.src="/profile-pictures/profilePicture.png";
                                    }}  style={{marginRight: "5%", verticalAlign: "center"}}/>
                                    <div className="user-info">
                                        <h5>{data.post.username}</h5>
                                        <small>{data.postDate}</small>
                                    </div>
                                </div>
                            </a>
                        </div>     
                    </div>
                    {data.comments.length > 0 && <div className="comments" style={{boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)", borderRadius: "15px", padding: "3%"}} >
                        {data.comments.map(function(comment, i){
                            return (
                                <div>
                                    <div style={{boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)", borderRadius: "15px", padding: "3%", paddingRight: "0", display: "flex"}}>
                                        <div className="comment" style={{width: "100%"}}>
                                            <div className="user" style={{alignItems: "center"}}>
                                                <img className='profilePicture' 
                                                    alt="user" id="image" src={"/profile-pictures/profilePicture" + comment.profileID + ".png"} onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; 
                                                    currentTarget.src="/profile-pictures/profilePicture.png";}}  
                                                    style={{verticalAlign: "center"}}/>
                                                <div className="user-info">
                                                    <h5>{comment.username}</h5>
                                                    <small>{comment.commentDate.split("T")[0] + " " + comment.commentDate.split("T")[1].slice(0, 5)}</small>
                                                </div>
                                            </div><br/>
                                            <div >
                                                <p style={{marginTop: "0"}}>{comment.comment}</p>
                                            </div>
                                        </div>
                                        {props.id == comment.profileID && <div className="postButtons" style={{width: "auto"}}>
                                            <button className="interactivePostButton" onClick={() => {deleteComment(comment.commentID)}}><img src="/deleteIcon.png" style={{width: "100%"}}/></button>
                                        </div>}
                                    </div><br />
                                </div>
                            )
                        })}
                    </div>}
                </div>
                <div style={{float: "right", width: "30%", marginTop: "2%"}}>
                    <div className='personalCard'>
                        <a href={"/profile/" + data.post.username}>
                            <div style={{paddingLeft: "15%", paddingRight: "15%", marginBottom: "5%"}}>
                            <div className='avatar'>
                                <img className='profilePicture' 
                                src={"/profile-pictures/profilePicture" + data.post.profileID + ".png"} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; 
                                currentTarget.src="/profile-pictures/profilePicture.png";
                                }}/>
                                <div style={{fontSize: "150%"}} id="name">{data.post.firstName} {data.post.lastName}</div>
                                <div  id="username">@{data.post.username}</div>
                            </div>
                            </div>
                        </a>
                    </div><br/>
                    <textarea style={{width: "-moz-available", resize: "none", width: "100%", borderRadius: "10px"}} rows="10" maxLength={1000} onChange={(e) => {
                    setComment(e.target.value);}}></textarea>
                    <button className='addPostButton' onClick={postComment}>
                        Kommentieren
                    </button>
                </div>
            </div>
        </main>
    </body>
    )
    } else {
        return (
            <Loading />
        )
    }
}

export default Post;