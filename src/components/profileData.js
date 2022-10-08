import React, {useEffect, useState} from "react";
import Loading from "./loading";
import axios from "axios";
import * as settings from '../conf/conf';

function ProfileData(props){
  const logOut = () => {
    axios.get(settings.config.SERVER_URL + '/logout');
    setTimeout(() => {window.location.href = ("/");}, 250)
  }

  return(
    <div className='profile'>
      <div className='profileNav'>
        <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
          <div style={{display: "flex"}}>
            <div style={{width: "17%"}}>
              <div className="avatar">
                <img className='profilePicture' 
                  src={"/profile-pictures/profilePicture" + props.data.profileID + ".png"} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/profile-pictures/profilePicture.png";
                  }}/>
              </div>
            </div>
            <div style={{width: "100%", marginLeft: "5%"}}>
              <div style={{display: "flex", width: "100%", height: "fit-content"}}>
                <div id="username" style={{fontSize: "150%", width: "max-content"}}>{props.data.username}</div>
                {props.account  ? 
                  <div className='profileOptions'>
                    <button className='button' onClick={(e) => {window.location.href = "/account/edit"}}>Profil bearbeiten</button>
                    <button className='button' onClick={logOut}>Log out</button>
                  </div> : 
                  <div></div> 
                }
              </div>
              <p style={{margin: "0", marginBottom: "3%"}}>{props.data.firstName} {props.data.lastName}</p>
              <div>{props.data.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /*<div className='profile'>
      <div className='profileNav'>
        <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
          <div style={{display: "flex"}}>
            <div className="avatar">
              <img className='profilePicture' 
                src={"/profile-pictures/profilePicture" + props.data.profileID + ".png"} onError={({ currentTarget }) => {
                  currentTarget.onerror = null; 
                  currentTarget.src="/profile-pictures/profilePicture.png";
              }}/>
            </div>
            {props.account  ? 
              <div className='profileOptions'>
                <button className='button' onClick={(e) => {window.location.href = "/account/edit"}}>Profil bearbeiten</button>
                <button className='button' onClick={logOut}>Log out</button>
              </div> : 
              <div></div> 
            }
          </div>
          <div style={{display: "flex"}}>
            <div>
              <div style={{fontSize: "150%", width: "max-content"}}>{props.data.firstName} {props.data.lastName}</div>
                <div id="username">@{props.data.username}
                </div>
              </div>
            <div className='description' style={{marginTop: "0", alignSelf: "center", marginLeft: "5%"}}>{props.data.bio}
            </div>
          </div>
        </div>
      </div>
    </div>*/
  )
}

export default ProfileData;