import React, { useEffect, useState } from "react";
import './network.css';
import Axios from 'axios';

function Content(props) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    for (var i = props.max; i > 0; i--) {
      const response = Axios.post("http://social-ims.alpha-lab.net/api/content", {id: i});
      response.then((res) => {
        var t = res.data[0].result1[0].date.split("T");
        setBlogs( myArray => [...myArray, {title: res.data[0].result1[0].title, text: res.data[0].result1[0].text,
          author: res.data[1].result2[0].username, date: t[0] + " " + t[1].slice(0, 5)}]);
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
