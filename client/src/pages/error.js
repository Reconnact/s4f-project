import React from "react";
import { Helmet } from 'react-helmet'
import '../network.css'
import { useNavigate} from 'react-router-dom'

function Error() {
    let navigate = useNavigate();

    return (
        <div className="errorBody">
            <Helmet>
            <meta charSet="utf-8" />
            <title>404 Error</title>
            </Helmet>
            <section class="notFound">
                <div class="img">
                    <a href="" onClick={() => {navigate("/");}} class="yes">
                        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
                    </a>
                    <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
                </div>
                <div class="text">
                    <h1>404</h1>
                    <h2>PAGE NOT FOUND</h2>
                    <h3>BACK TO HOME?</h3>
                    <a href="" onClick={() => {navigate("/");}} class="yes">YES</a>
                    <a href="https://www.youtube.com/watch?v=NhSC4C43wgc" target="_blank">NO</a>
                </div>
            </section>
        </div>
    );
}

export default Error;