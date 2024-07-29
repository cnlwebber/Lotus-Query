import React from 'react';
import { Link } from 'react-router-dom';


// this will be the logo/name of website that is in the top left corner of the screen on
// every page.
const LogoButton = ({size}) => {
    return (
        <Link to="/" className={`logoButton ${size}`}>
            <img src="../assets/logo.png" alt="Logo" classname={`logoImage ${size}`}></img>
        </Link>
    );
};

export default LogoButton;