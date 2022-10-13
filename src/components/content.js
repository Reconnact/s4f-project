import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import '../pages/network';
import Axios from 'axios';
import * as settings from '../conf/conf';
import Swal from 'sweetalert2'
import Loading from "./loading";
import axios from "axios";
function Content(props) {
  const [blogs, setBlogs] = useState([]);
  const [account, setAccount] = useState(false)
  const [isLoading, setLoading] = useState(true)


  const deletePost = (id) => {
    Swal.fire({
      title: 'Beitrag wirklich löschen?',
      text: "Wenn der Beitrag gelöscht ist kannst du ihn nicht wiederherstellen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(settings.config.SERVER_URL + '/deletePost', {id: id}) 
        Swal.fire(
          'Gelöscht!',
          'Dein Beitrag wurde gelöscht.',
          'info'
        ).then((result) => {
          window.location.reload()
        })
      }
    })

    
  }
  

  useEffect( () => {
     if (props.account == false){
      const response = Axios.post(settings.config.SERVER_URL + '/content');
      response.then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          var t = res.data[i].date.split("T");
          if (res.data[i].username === props.username){
            setBlogs((blogs) => [...blogs, {title: res.data[i].title, text: res.data[i].text,
              author: res.data[i].username, date: t[0] + " " + t[1].slice(0, 5), redirect: "/account", id: res.data[i].postID, profileID:  res.data[i].profileID}])
          }else{
            setBlogs((blogs) => [...blogs, {title: res.data[i].title, text: res.data[i].text,
              author: res.data[i].username, date: t[0] + " " + t[1].slice(0, 5), redirect: "/profile/" + res.data[i].username, id: res.data[i].postID, profileID:  res.data[i].profileID}])
          }
        }
        setLoading(false)
      })
    }else{
      const response =  Axios.post(settings.config.SERVER_URL + '/userContent', {username: props.username});
      response.then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          var t = res.data[i].date.split("T");
          setBlogs((blogs) => [...blogs, {title: res.data[i].title, text: res.data[i].text,
            author: res.data[i].username, date: t[0] + " " + t[1].slice(0, 5), id: res.data[i].postID, profileID:  res.data[i].profileID}])
          if(res.data[i].username === props.user){
            setAccount(true)
          }
        }
        setLoading(false)
      })
    }

  }, []);


  if (isLoading){
    return(
      <Loading />
    )
  }

  if (blogs.length == 0 ){
    return (
      <div className="noContent">
        <h4>Noch keine Beiträge erstellt</h4>
      </div>
    )
  }
  return (
    <div>
      {blogs.map((blog) => (
        <div className="card" style={{display: "flex"}}>
          <div className="card-body" style={{width: "100%"}}>
            <a href={"/post/" + blog.id} className="postTitle"><h4>{blog.title}</h4></a>
            <p>{blog.text}</p>
            <a className="userLink" href={blog.redirect}>
              <div className="user" style={{alignItems: "center"}}>
                <img className='profilePicture' 
                  alt="user" id="image" src={"/profile-pictures/profilePicture" + blog.profileID + ".png"} onError={({ currentTarget }) => {
                  currentTarget.onerror = null; 
                  currentTarget.src="/profile-pictures/profilePicture.png";
                }}  style={{marginRight: "5%", verticalAlign: "center"}}/>
                <div className="user-info">
                  <h5 id="delete">{blog.author}</h5>
                  <small>{blog.date}</small>
                </div>
              </div>
            </a>
          </div>     
          <div className="postButtons">
            <button className="interactivePostButton" onClick={() =>{ window.location.href = "/post/" + blog.id}}><img src="/commentIcon.png" style={{width: "100%"}}/></button>
            {account === true &&
              <button className="interactivePostButton" onClick={() => deletePost(blog.id)}><img src="/deleteIcon.png" style={{width: "100%"}}/></button>
            }
          </div>
          
        </div>

      ))}
    </div>  
  )
}

export default Content;
