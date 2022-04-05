import React from "react";
import { Helmet } from 'react-helmet'

function Error() {
    return (
        <div>
            <Helmet>
            <meta charSet="utf-8" />
            <title>404 Error</title>
            </Helmet>
            404 - :D
        </div>
    );
}

export default Error;