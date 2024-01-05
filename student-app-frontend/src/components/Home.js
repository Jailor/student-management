import React from 'react';
import BackgroundImg from '../background.jpg';
import { Container } from 'reactstrap';
import {checkAuthenticationStatus} from './Auth';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`,
    padding: '20px',
    color: 'white' // Set text color to white
};

const Home = () => {
    if (!checkAuthenticationStatus()) {
        window.location.href = "/login";
        return <div>Redirecting...</div>;
    }
    return (
        <div style={backgroundStyle}>
            <Container>
                <h1 className="display-3">Student management platform</h1>
                <p className="lead"><b>Welcome user to the student management platform!</b></p>
                <hr className="my-2" />
                <p><b>Use the drop down to navigate to the available menus!</b></p>
            </Container>
        </div>
    );
};

export default Home;
