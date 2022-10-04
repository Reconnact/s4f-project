import Axios from 'axios';
import * as settings from '../conf/conf';
import React, { useEffect, useState } from "react";

function Datalist(props) {
    const [users, setUser] = useState([]);

    useEffect(()=> {
        const response = Axios.post(settings.config.SERVER_URL + '/allUser', {id: props.id});
        response.then((res) => {
            for (let index = 0; index < res.data.length; index++) {
                setUser((users) => [...users, {username: res.data[index].username}])
            }
        })
    }, []);
    return(
        <div>
            {users.map((user)=> (
                <option value={user.username}>{user.username}</option>
            ))}
       </div>
    );
}

export default Datalist;