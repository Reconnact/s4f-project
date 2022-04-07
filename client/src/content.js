import React, { useEffect, useState, express, memo } from "react";
import './network.css';
import Axios from 'axios';

function Content() {   
    const [blogs, setBlogs] = useState([]);
    const [blogNum, setBlogNum] = useState();
    Axios.get("http://localhost:3001/contentNum").then((response)=> {
      setBlogNum(response.data[0].Max_Id);
    });

    for (var i = blogNum; i >= 1; i--) {
      Axios.get("http://localhost:3001/content", {
        id: i
      }).then((response)=> {
        //setBlogs(blogs => [...blogs, {title: response.data[0].title, text: response.data[0].text, author: "Reconnact", date: "Jetzt"}])
        //blogs.push({title: response.data[0].title, text: response.data[0].text, author: "Reconnact", date: "Jetzt"});
        //TODO
      });
    }
    
    return (
        <div>
        {blogs.map((blog) => (
        <div class="card">
        <div class="card-body">
          <h4>{blog.title}</h4>
          <p>{blog.text}</p>
          <div class="user">
            <img alt="user" id="image"/>
            <div class="user-info">
              <h5>{blog.author}</h5>
              <small>{blog.date}</small>
            </div>
          </div>       
        </div>
    </div>
    ))} 
    </div>
    ); 
}

export default Content;