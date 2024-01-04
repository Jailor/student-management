import React from 'react';
import BackgroundImg from '../background.jpg';
import { Container } from 'reactstrap';

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
    return (
        <div style={backgroundStyle}>
            <Container>
                <h1 className="display-3">Energy platform</h1>
                <p className="lead"><b>Welcome user to the energy platform!</b></p>
                <hr className="my-2" />
                <p><b>Use the drop down to navigate to the available menus!</b></p>
                {/* Additional content */}
            </Container>
        </div>
    );
};

export default Home;
