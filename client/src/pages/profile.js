import React from "react";
import { Helmet } from 'react-helmet'
import { Navigate, useParams} from 'react-router-dom'

function Profile() {
    let { username } = useParams();
    if (username == "Reconnact"){
        return (
            <div>
                <Helmet>
                <meta charSet="utf-8" />
                <title>TODO!</title>
                </Helmet>
                Profile from { username }
            </div>
        );
    } else {
        return <Navigate to="/error" />;
    }
}

export default Profile;