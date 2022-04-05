import React from "react";
import { Helmet } from 'react-helmet'
import { useNavigate, useParams} from 'react-router-dom'

function Profile() {
    let { username } = useParams();
    
    return (
        <div>
            <Helmet>
            <meta charSet="utf-8" />
            <title>TODO!</title>
            </Helmet>
            Profile from { username }
        </div>
    );
}

export default Profile;