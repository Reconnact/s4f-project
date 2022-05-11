import React, { useEffect, useState } from "react";
import '../pages/network';
import Axios from 'axios';
import * as settings from '../conf/conf';

function Content(props) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (props.account == false){
      const response = Axios.post(settings.config.SERVER_URL + '/content');
      response.then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          var t = res.data[i].date.split("T");
          setBlogs((blogs) => [...blogs, {title: res.data[i].title, text: res.data[i].text,
            author: res.data[i].username, date: t[0] + " " + t[1].slice(0, 5)}])
        }
      })
    }else{
      console.log(props.username)
      const response = Axios.post(settings.config.SERVER_URL + '/userContent', {username: props.username});
      response.then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          var t = res.data[i].date.split("T");
          setBlogs((blogs) => [...blogs, {title: res.data[i].title, text: res.data[i].text,
            author: res.data[i].username, date: t[0] + " " + t[1].slice(0, 5)}])
        }
      })
    }
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div className="card">
          <div className="card-body">
            <h4>{blog.title}</h4>
            <p>{blog.text}</p>
            <a className="userLink" href={"/profile/" + blog.author}><div className="user">
              <img alt="user" id="image" src="/profile-pictures/profilePicture.png" style={{marginRight: "5%"}}/>
              <div className="user-info">
                <h5>{blog.author}</h5>
                <small>{blog.date}</small>
              </div>
            </div></a>
          </div>
        </div>
      ))}
    </div>
  );

}

export default Content;
