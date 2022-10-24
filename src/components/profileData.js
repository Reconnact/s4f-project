import React, {useEffect, useState} from "react";
import Loading from "./loading";
import axios from "axios";
import * as settings from '../conf/conf';

function ProfileData(props){
  const [isLoading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);


  const logOut = () => {
    axios.get(settings.config.SERVER_URL + '/logout');
    setTimeout(() => {window.location.href = ("/");}, 250)
  }

  useEffect(() => {
    axios.post(settings.config.SERVER_URL + "/getFollowerCount", {profileID: props.data.profileID}).then((response) => {
      setFollowers(response.data[0].followers)
    })
    axios.post(settings.config.SERVER_URL + "/getPostCount", {profileID: props.data.profileID}).then((response) => {
      setPostCount(response.data[0].posts)
    })
    axios.post(settings.config.SERVER_URL + "/getFollowingCount", {profileID: props.data.profileID}).then((response) => {
      setFollowing(response.data[0].following)
    })
    if (!props.account){
      axios.post(settings.config.SERVER_URL + "/checkFollowing", {profileID: props.data.profileID, followingID: props.id}).then((response) => {
        console.log(response.data[0].following)
        if (response.data[0].following == 1){
          setIsFollowing(true)
        }
      })
    }
    setLoading(false)
  }, [])

  const switchFollow = async () => {
    axios.post(settings.config.SERVER_URL + "/switchFollowing", {following: isFollowing, profileID: props.data.profileID, followerID: props.id})
    if (isFollowing) setFollowers(followers -1)
    else  setFollowers(followers +1)
    setIsFollowing(!isFollowing)
  }

  const showImage = () => {      
    var modal = document.getElementById("myModal");  
    var img = document.getElementById("profilePicture");
    var modalImg = document.getElementById("biggerImage");
    modal.style.display = "block";
    modalImg.src = img.src;
  }

  if (isLoading){
    return(
      <Loading />
    )
  }

  return(
    <div className='profile'>
      <div className='profileNav'>
        <div style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "5%", marginBottom: "5%", width: "100%"}}>
          <div style={{display: "flex"}}>
            <div style={{width: "17%"}}>
              <div className="avatar">
                <img className='profilePicture' id="profilePicture" 
                  src={"/profile-pictures/profilePicture" + props.data.profileID + ".png"} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/profile-pictures/profilePicture.png";
                  }} onClick={showImage}/>
              </div><br/>
            </div>
            <div style={{width: "100%", marginLeft: "5%"}}>
              <div style={{display: "flex", width: "100%", height: "fit-content"}}>
                <div id="username" style={{fontSize: "150%", width: "max-content"}}>{props.data.username}</div>
                {props.account  ? 
                  <div className='profileOptions'>
                    <button className='button' onClick={(e) => {window.location.href = "/account/edit"}}>Profil bearbeiten</button>
                    <button className='button' onClick={logOut}>Log out</button>
                  </div> : isFollowing ?
                  <div className='profileOptions'>
                    <button className='button' onClick={switchFollow}>Gefolgt</button>
                  </div> :
                  <div className='profileOptions'>
                    <button className='button' onClick={switchFollow}>Folgen</button>
                  </div>
                }
              </div>
              <p style={{margin: "0", marginBottom: "3%"}}>{props.data.firstName} {props.data.lastName}</p>
              <div style={{display: "flex", width: "40%", justifyContent: "space-between"}}>
                {postCount == 1 ? <div><b>{postCount}</b> Beitrag</div> : <div><b>{postCount}</b> Beiträge</div>}
                <div><a href={"/profile/" + props.data.username + "/network"}><b>{followers}</b> Follower</a></div>
                <div><a href={"/profile/" + props.data.username + "/network"}><b>{following}</b> Gefolgt</a></div>
              </div><br/>
              <div>{props.data.bio}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="myModal" className="modal">
        <span className="close" onClick={(e) => {document.getElementById("myModal").style.display = "none"}}>&times;</span>
        <img className="modal-content" id="biggerImage"/>
      </div>
    </div>
  )
}

export default ProfileData;