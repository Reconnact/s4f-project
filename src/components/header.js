import Axios from 'axios';
import * as settings from '../conf/conf';
import React, { useEffect, useState } from "react";
import Loading from "./loading"
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function Header(props) {
  const [users, setUser] = useState([]);
  const [loadig, setLoading] = useState(true);

    useEffect(()=> {
      readData()
    }, []);

    const readData = async () => {
      await Axios.post(settings.config.SERVER_URL + '/allUser', {id: props.id})
        .then((res) => {
            for (let index = 0; index < res.data.length; index++) {
    
              setUser((users) => [...users, {name: res.data[index].username, id: res.data[index].profileID,
                firstName: res.data[index].firstName, lastName: res.data[index].lastName}])
            } 
            setLoading(false)
            
        });        
    }


  const handleOnSelect = (item) => {
    window.location.href=("/profile/" + item.name)
  }

  const formatResult = (item) => {
    return (
      <div>
        <span><a href={"/profile/" + item.name} style={{ display: 'flex', textAlign: 'left', alignContent: "space-evenly"}}>
          <img className='profilePicture'  
            style={{width: "12%", borderRadius: "100%", boxShadow: "none"}} 
            src={"/profile-pictures/profilePicture" + item.id + ".png"} onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src="/profile-pictures/profilePicture.png";
          }}/>
          <div style={{paddingLeft: "2%"}}><h5 style={{margin: 0, verticalAlign: "middle", display: "inline"}}>{item.name}</h5><h5 style={{margin: 0, color: "#8E8E8E"}}>{item.firstName} {item.lastName}</h5></div>
          </a></span>
      </div>
    )
  }
  if (loadig){
    return(
      <Loading />
    )
  }

  return (
    <header className="App-header" id="App-header">
      <div className='inner-header'>
        <a href='/' style={{display: "flex", alignItems: "center"}}><h3>Social IMS</h3></a>
        <div className='header-search'>
          <h3><ReactSearchAutocomplete
            items={users}
            fuseOptions={{ keys: ["name", "firstName", "lastName"] }}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            showNoResultsText="Keine Resultate"
            placeholder='Suche...'
            showIcon={false}
            styling={{
              border: "2px solid #D7E6FA",
              hoverBackgroundColor: "#D7E6FA"
          }}/></h3>
        </div>
      </div>
    </header>
  );
}

export default Header;